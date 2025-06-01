import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StorycharactertypeService } from '../../services/storycharactertype.service';
import { Storycharactertype } from '../../interfaces/storycharactertype.interface';

@Component({
	selector: 'storycharactertype-selector',
	templateUrl: './storycharactertype-selector.component.html',
	styleUrls: ['./storycharactertype-selector.component.scss'],
	imports: [SelectModule],
})
export class StorycharactertypeSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storycharactertype[] {
		return this._storycharactertypeService.storycharactertypes;
	}

	constructor(private _storycharactertypeService: StorycharactertypeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
