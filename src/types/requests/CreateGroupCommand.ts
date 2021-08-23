import {ChatType} from "../enums/ChatType";

export class CreateGroupCommand {
    groupType: ChatType;
    groupTitle: string;

    constructor(groupType: ChatType, groupTitle: string) {
        this.groupType = groupType;
        this.groupTitle = groupTitle;
    }
}
