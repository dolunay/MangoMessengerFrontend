import {ChatType} from "../enums/ChatType";

export interface IChat {
  chatId: string;
  title: string;
  image: string;
  lastMessageAuthor: string;
  description: string;
  lastMessage: string;
  lastMessageAt: string;
  membersCount: number;
  chatType: ChatType;
  isArchived: boolean;
  isMember: boolean;
}
