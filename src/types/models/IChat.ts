import {GroupType} from "../enums/GroupType";
import {IMessage} from "./IMessage";

export interface IChat {
  chatId: string;
  title: string;
  chatType: GroupType;
  chatLogoImageUrl: string;
  description: string;
  membersCount: number;
  isArchived: boolean;
  isMember: boolean;
  lastMessage: IMessage | null;
}
