import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StorychangetypeService } from '../../services/storychangetype.service';
import { Storychangetype } from '../../interfaces/storychangetype.interface';

@Component({
	selector: 'storychangetype-selector',
	templateUrl: './storychangetype-selector.component.html',
	styleUrls: ['./storychangetype-selector.component.scss'],
	imports: [SelectModule],
})
export class StorychangetypeSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storychangetype[] {
		return this._storychangetypeService.storychangetypes;
	}

	constructor(private _storychangetypeService: StorychangetypeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
