import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ICreateCommunityResponse} from "../../../../types/responses/ICreateCommunityResponse";
import {CommunitiesService} from "../../../services/communities.service";
import {CreateChannelCommand} from "../../../../types/requests/CreateChannelCommand";
import {Subscription} from "rxjs";
import {AutoUnsubscribe} from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html'
})
export class CreateGroupDialogComponent implements OnDestroy {

  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: ICreateCommunityResponse,
              private chatService: CommunitiesService) {
  }

  protected createChannelSub$!: Subscription;

  public groupType = "Private Channel";
  public groupTypes = ["Private Channel", "Public Channel", "ReadOnly Channel"];
  public groupTitle = '';
  public groupDescription = '';

  onNoClick = () => this.dialogRef.close();

  onCreateGroupClick(): void {
    if (!this.groupType) {
      alert("Group type must not be empty.");
      return;
    }

    if (!this.groupTitle) {
      alert("Group title must not be empty.");
      return;
    }

    if (!this.groupDescription) {
      alert("Group description must not be empty.");
      return;
    }

    const groupType = this.parseGroupType();
    const createGroupCommand = new CreateChannelCommand(groupType, this.groupTitle, this.groupDescription);

    this.createChannelSub$ = this.chatService.createChannel(createGroupCommand).subscribe(_ => {
      this.dialogRef.close();
    }, error => alert(error.error.errorDetails));
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
  }
}
