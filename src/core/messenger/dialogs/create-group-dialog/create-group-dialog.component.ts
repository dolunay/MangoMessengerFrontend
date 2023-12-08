import { ValidationService } from '../../../services/validation.service';
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
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent implements OnDestroy {

  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: ICreateCommunityResponse,
              private chatService: CommunitiesService,
              private validationService: ValidationService) {
  }

  protected createChannelSub$!: Subscription;

  public groupTitle = '';
  public groupDescription = '';

  onNoClick = () => this.dialogRef.close();

  onCreateGroupClick(): void {
    this.validationService.validateField(this.groupTitle, 'Group Title');
    this.validationService.validateField(this.groupDescription, 'Group Description');

    const createGroupCommand = new CreateChannelCommand(this.groupTitle, this.groupDescription);

    this.createChannelSub$ = this.chatService.createChannel(createGroupCommand).subscribe(_ => {
      this.dialogRef.close();
    }, error => alert(error.error.errorDetails));
  }

  ngOnDestroy(): void {
  }
}
