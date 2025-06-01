import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StoryeventService } from '../../services/storyevent.service';
import { Storyevent } from '../../interfaces/storyevent.interface';

@Component({
	selector: 'storyevent-selector',
	templateUrl: './storyevent-selector.component.html',
	styleUrls: ['./storyevent-selector.component.scss'],
	imports: [SelectModule],
})
export class StoryeventSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storyevent[] {
		return this._storyeventService.storyevents;
	}

	constructor(private _storyeventService: StoryeventService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
