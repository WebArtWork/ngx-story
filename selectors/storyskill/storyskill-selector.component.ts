import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StoryskillService } from '../../services/storyskill.service';
import { Storyskill } from '../../interfaces/storyskill.interface';

@Component({
	selector: 'storyskill-selector',
	templateUrl: './storyskill-selector.component.html',
	styleUrls: ['./storyskill-selector.component.scss'],
	imports: [SelectModule],
})
export class StoryskillSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storyskill[] {
		return this._storyskillService.storyskills;
	}

	constructor(private _storyskillService: StoryskillService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
