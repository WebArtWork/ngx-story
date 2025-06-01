import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { StorycharacterService } from '../../services/storycharacter.service';
import { Storycharacter } from '../../interfaces/storycharacter.interface';

@Component({
	selector: 'storycharacter-selector',
	templateUrl: './storycharacter-selector.component.html',
	styleUrls: ['./storycharacter-selector.component.scss'],
	imports: [SelectModule],
})
export class StorycharacterSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Storycharacter[] {
		return this._storycharacterService.storycharacters;
	}

	constructor(private _storycharacterService: StorycharacterService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
