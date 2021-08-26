import {GroupType} from "../enums/GroupType";

export interface IChat {
  chatId: string;
  title: string;
  image: string;
  lastMessageAuthor: string;
  description: string;
  lastMessage: string;
  lastMessageAt: string;
  membersCount: number;
  chatType: GroupType;
  isArchived: boolean;
  isMember: boolean;
}
