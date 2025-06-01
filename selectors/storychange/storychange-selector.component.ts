import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StorychangeService } from '../../services/storychange.service';
import { Storychange } from '../../interfaces/storychange.interface';

@Component({
	selector: 'storychange-selector',
	templateUrl: './storychange-selector.component.html',
	styleUrls: ['./storychange-selector.component.scss'],
	imports: [SelectModule],
})
export class StorychangeSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storychange[] {
		return this._storychangeService.storychanges;
	}

	constructor(private _storychangeService: StorychangeService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
