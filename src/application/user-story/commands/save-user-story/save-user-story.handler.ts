import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ICommentRepository } from "src/domain/comment/comment.repository";
import { IPersonRepository } from "src/domain/person/person.repository";
import { SaveUserStoryCommand } from "./save-user-story.command";
import { UserStory } from "src/domain/user-story/user-story";
import { Person } from "src/domain/person/person";
import { IUserStoryRepository } from "src/domain/user-story/user-story.repository";
import { IEventLogRepository } from "src/domain/event-log/event-log.repository";

@CommandHandler(SaveUserStoryCommand)
export class SaveUserStoryHandler implements ICommandHandler<SaveUserStoryCommand, UserStory> {

    constructor(
        private _personRepository: IPersonRepository,
        private _commentRepository: ICommentRepository,
        private _userStoryRepository: IUserStoryRepository,
        private _eventLogRepository: IEventLogRepository
    ) { }
    async execute(command: SaveUserStoryCommand): Promise<UserStory> {
        try {
            await this._eventLogRepository.InsertLog(command.Url, `Start processing UserStory:${command.Id} for database.`);

            let persons = await this.ManagePersons(command);
            let userStoryId = await this._userStoryRepository.GetIdByExternalId(command.Id);
            let userStory = !userStoryId ? await this.InsertUserStory(command) : await this.UpdateUserStory(userStoryId, command);
            await this._userStoryRepository.UpdateAssignedPerson(userStory.id, userStory)
            await this._commentRepository.DeleteFromUserStoryId(userStory.id);
            let commentsToInsert = command.Comments.map(item => item.ToComment())
            commentsToInsert.forEach(item => {
                item.user = persons.find(person => person.externalId == item.user.externalId);
            })
            if (commentsToInsert.length > 0) {
                userStory.comments = await this._commentRepository.InsertForUserStory(userStory.id, commentsToInsert)
            }
            await this._eventLogRepository.InsertLog(command.Url, `End processing UserStory:${command.Id} for database.`);

            return userStory
        } catch (error) {
            this._eventLogRepository.InsertErrorLog(command.Url, String(error))
            throw error
        }

    }
    async InsertUserStory(command: SaveUserStoryCommand) {
        let userStory = new UserStory({
            id: undefined, externalId: command.Id,
            areaPath: command.AreaPath, teamProject: command.TeamProject, iterationPath: command.IterationPath,
            state: command.State, reason: command.Reason, assignedTo: null, title: command.Title,
            boardColumn: command.BoardColumn, boardColumnDone: command.BoardColumnDone,
            priority: command.Priority, valueArea: command.ValueArea, risk: command.Risk,
            kanbanColumn: command.KanbanColumn, kanbanColumnDone: command.KanbanColumnDone,
            description: command.Description, acceptanceCriteria: command.AcceptanceCriteria,
            tags: command.Tags, featureParent: null, url: command.Url, comments: [], pageUrl: command.PageUrl
        })
        userStory.id = await this._userStoryRepository.Insert(userStory, command.FeatureParentId);
        return userStory;
    }
    async UpdateUserStory(userStoryId: number, command: SaveUserStoryCommand) {
        let userStory = new UserStory({
            id: userStoryId, externalId: command.Id,
            areaPath: command.AreaPath, teamProject: command.TeamProject, iterationPath: command.IterationPath,
            state: command.State, reason: command.Reason, assignedTo: null, title: command.Title,
            boardColumn: command.BoardColumn, boardColumnDone: command.BoardColumnDone,
            priority: command.Priority, valueArea: command.ValueArea, risk: command.Risk,
            kanbanColumn: command.KanbanColumn, kanbanColumnDone: command.KanbanColumnDone,
            description: command.Description, acceptanceCriteria: command.AcceptanceCriteria,
            tags: command.Tags, featureParent: null, url: command.Url, comments: [], pageUrl: command.PageUrl
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
            if (!savedPersons.find(item => item.externalId == element.externalId) && !persons.find(item => item.externalId == element.externalId)) personsToSave.push(element)
        });
        await this._personRepository.InsertMany(personsToSave);
        return await this._personRepository.GetManyByExternalId(persons.map(item => item.externalId));
    }
}