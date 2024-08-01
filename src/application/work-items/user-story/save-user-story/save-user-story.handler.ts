import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { IUtilsRepository } from "src/domain/utils/utils.repository";
import { Person } from "src/domain/work-items/person";
import { IPersonRepository } from "src/domain/work-items/person.repository";
import { UserStory } from "src/domain/work-items/user-story/user-story";
import { IUserStoryRepository } from "src/domain/work-items/user-story/user-story.repository";
import { SaveUserStoryCommand } from "./save-user-story.command";

@CommandHandler(SaveUserStoryCommand)
export class SaveUserStoryHandler implements ICommandHandler<SaveUserStoryCommand, UserStory> {

    constructor(
        private _personRepository: IPersonRepository,
        private _userStoryRepository: IUserStoryRepository,
        private _eventLogRepository: IUtilsRepository
    ) { }

    async execute(command: SaveUserStoryCommand): Promise<UserStory> {
        try {
            await this._eventLogRepository.InsertLog(command.Url, `Start processing UserStory:${command.Id} for database.`);

            let persons = await this.ManagePersons(command);

            let userStoryId = await this._userStoryRepository.GetIdByExternalId(command.Id);

            let userStory = !userStoryId ? await this.InsertUserStory(command) : await this.UpdateUserStory(userStoryId, command);

            await this._userStoryRepository.UpdateAssignedPerson(userStory.id, userStory)

            await this._userStoryRepository.DeleteComment(userStory.id);

            let commentsToInsert = command.Comments.map(item => item.ToComment())

            commentsToInsert.forEach(item => {
                item.user = persons.find(person => person.externalId == item.user.externalId);
            })

            if (commentsToInsert.length > 0) {
                userStory.comments = await this._userStoryRepository.InsertComment(userStory.id, commentsToInsert)
            }

            await this._eventLogRepository.InsertLog(command.Url, `End processing UserStory:${command.Id} for database.`);

            return userStory
        }
        catch (error) {

            this._eventLogRepository.InsertErrorLog(command.Url, String(error))

            throw error
        }

    }

    private async InsertUserStory(command: SaveUserStoryCommand) {

        let userStory = new UserStory({
            id: undefined, externalId: command.Id,
            areaPath: command.AreaPath, teamProject: command.TeamProject, iterationPath: command.IterationPath,
            state: command.State, reason: command.Reason, assignedTo: null, title: command.Title,
            boardColumn: command.BoardColumn, boardColumnDone: command.BoardColumnDone,
            priority: command.Priority, valueArea: command.ValueArea, risk: command.Risk,
            kanbanColumn: command.KanbanColumn, kanbanColumnDone: command.KanbanColumnDone,
            description: command.Description, acceptanceCriteria: command.AcceptanceCriteria,
            tags: command.Tags, feature: null, url: command.Url, comments: [], pageUrl: command.PageUrl
        })

        userStory.id = await this._userStoryRepository.Insert(userStory, command.FeatureParentId);

        return userStory;
    }

    private async UpdateUserStory(userStoryId: number, command: SaveUserStoryCommand) {
        
        let userStory = new UserStory({
            id: userStoryId, externalId: command.Id,
            areaPath: command.AreaPath, teamProject: command.TeamProject, iterationPath: command.IterationPath,
            state: command.State, reason: command.Reason, assignedTo: null, title: command.Title,
            boardColumn: command.BoardColumn, boardColumnDone: command.BoardColumnDone,
            priority: command.Priority, valueArea: command.ValueArea, risk: command.Risk,
            kanbanColumn: command.KanbanColumn, kanbanColumnDone: command.KanbanColumnDone,
            description: command.Description, acceptanceCriteria: command.AcceptanceCriteria,
            tags: command.Tags, feature: null, url: command.Url, comments: [], pageUrl: command.PageUrl
        })

        await this._userStoryRepository.Update(userStoryId, userStory, command.FeatureParentId);

        return userStory;
    }

    private async ManagePersons(command: SaveUserStoryCommand) {
        let persons: Person[] = [];
        if (command.AssignedTo) persons.push(
            command.AssignedTo.ToPerson()
        );
        
        command.Comments.forEach(comment => {
            persons.push(comment.CreatedBy.ToPerson());
        })

        let savedPersons = await this._personRepository.GetManyByExternalId(persons.map(item => item.externalId));

        let personsToSave: Person[] = [];

        persons.forEach(element => {
            if (!savedPersons.find(item => item.externalId == element.externalId) && !personsToSave.find(item => item.externalId == element.externalId)) personsToSave.push(element)
        });

        await this._personRepository.InsertMany(personsToSave);
        
        return await this._personRepository.GetManyByExternalId(persons.map(item => item.externalId));
    }
}