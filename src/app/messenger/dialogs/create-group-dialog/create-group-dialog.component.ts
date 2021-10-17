import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ICreateCommunityResponse} from "../../../../types/responses/ICreateCommunityResponse";
import {CommunitiesService} from "../../../services/communities.service";
import {CreateChannelCommand} from "../../../../types/requests/CreateChannelCommand";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent implements OnDestroy {

  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICreateCommunityResponse,
              private chatService: CommunitiesService) {
  }

  groupType = "Private Channel";
  groupTypes = ["Private Channel", "Public Channel", "ReadOnly Channel"];
  groupTitle = '';
  groupDescription = '';

  subscriptions: Subscription[] = [];

  createChatResponse: ICreateCommunityResponse = {chatId: "", message: "", success: false};

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateGroupClick(): void {
    const groupType = this.parseGroupType();
    const createGroupCommand = new CreateChannelCommand(groupType, this.groupTitle, this.groupDescription);

    let createGroupSub = this.chatService.createChannel(createGroupCommand).subscribe(_ => {
      this.dialogRef.close();
    }, error => {
      alert(error.error.ErrorMessage);
    });

    this.subscriptions.push(createGroupSub);
  }

  private parseGroupType(): number {
    if (this.groupType === "Private Channel") {
      return 3;
    }

    if (this.groupType === "Public Channel") {
      return 4;
    }

    return 5;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
