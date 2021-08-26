import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupType} from "../../../../types/enums/GroupType";
import {ICreateChatResponse} from "../../../../types/responses/ICreateChatResponse";
import {ChatsService} from "../../../services/chats.service";
import {CreateGroupCommand} from "../../../../types/requests/CreateGroupCommand";

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent {

  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICreateChatResponse,
              private chatService: ChatsService) {
  }

  groupType: GroupType = GroupType.PublicChannel;
  groupTypes = [GroupType.PrivateChannel, GroupType.PublicChannel, GroupType.ReadOnlyChannel];
  groupTitle = '';
  groupDescription = '';

  createChatResponse: ICreateChatResponse = {chatId: "", message: "", success: false};

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateGroupClick(): void {
    const groupType = this.parseGroupType();
    const createGroupCommand = new CreateGroupCommand(groupType, this.groupTitle, this.groupDescription);
    this.chatService.createGroup(createGroupCommand).subscribe(_ => {
      this.dialogRef.close();
    }, error => {
      alert(error.error.ErrorMessage);
    })
  }

  private parseGroupType(): number {
    if (this.groupType === GroupType.PrivateChannel) {
      return 2;
    }

    if (this.groupType === GroupType.PublicChannel) {
      return 3;
    }

    return 4;
  }
}
