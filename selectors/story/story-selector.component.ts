import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StoryService } from '../../services/story.service';
import { Story } from '../../interfaces/story.interface';

@Component({
	selector: 'story-selector',
	templateUrl: './story-selector.component.html',
	styleUrls: ['./story-selector.component.scss'],
	imports: [SelectModule],
})
export class StorySelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Story[] {
		return this._storyService.storys;
	}

	constructor(private _storyService: StoryService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
