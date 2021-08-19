import {GroupType} from "../enums/GroupType";

export class CreateGroupCommand {
    groupType: GroupType;
    groupTitle: string;

    constructor(groupType: GroupType, groupTitle: string) {
        this.groupType = groupType;
        this.groupTitle = groupTitle;
    }
}
