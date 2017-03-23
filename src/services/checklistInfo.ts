import {Injectable} from "@angular/core";
import "rxjs/Rx";
import {PtkHttp} from "./ptkHttp";
import { URLs } from './URLs';




@Injectable()
export class ChecklistInfo {

 private checklistInfoDict: {};   

  constructor(
    private ptkHttp: PtkHttp
  ){
      this.checklistInfoDict = {
        'Cleaning': {
            'sections': [
                {
                    'section_name': 'Check-In',
                    'section_type': 'Check-In',
                    'section_fields': [{
                        'check_in_stamp': {
                            'name': 'Check-In',
                            'type': 'datetime',
                        },
                    }],
                    'section_stage': '1',
                },
                {
                    'section_name': 'Arrival Checklist',
                    'section_type': 'Questions',
                    'section_fields': [{
                        'keys_in_keysafe': {
                            'name': 'Are The Keys In The Keysafe?',
                            'type': 'boolean',
                        },
                        'dirty_linen_count_start': {
                            'name': 'How Many Dirty Linens Are There?',
                            'type': 'number',
                        },
                        'clean_linen_count_start': {
                            'name': 'How Many Clean Linens Are There?',
                            'type': 'number',
                        }
                    }],
                    'section_stage': '2',
                },
                {
                    'section_name': 'Learn',
                    'section_type': 'Property Info',
                    'section_fields': [],
                    'section_stage': '3',
                },
                {
                    'section_name': 'Complete Clean',
                    'section_type': 'Checklist Boolean',
                    'section_fields': [],
                    'section_stage': '4',
                },
                {
                    'section_name': 'Departure Checklist',
                    'section_type': 'Questions',
                    'section_fields': [{
                        'clean_linen_count_end': {
                            'name': 'How many sets of clean linen are there?',
                            'type': 'number',
                        },
                        'dirty_linen_count_end': {
                            'name': 'How many sets of dirty linen are there?',
                            'type': 'number',
                        },
                        'damages_reported': {
                            'name': 'Do you need to report any damages?',
                            'type': 'boolean',
                        },
                        'damages_description': {
                            'name': 'Damages description:',
                            'type': 'text',
                        },
                        'delivery_during_clean': {
                            'name': 'There was any delivery during clean?',
                            'type': 'boolean',
                        },
                        'number_of_beds_made': {
                            'name': 'How many beds have you made?',
                            'type': 'number',
                        },
                        'comments': {
                            'name': 'Comments:',
                            'type': 'text'
                        }
                    }], 
                    'section_stage': '5',
                },
                {
                    'section_name': 'Take Photos',
                    'section_type': 'Property Info',
                    'section_fields': [],
                    'section_stage': '6' 
                },
                {
                    'section_name': 'Check-Out',
                    'section_type': 'Check-Out',
                    'section_fields': [{
                        'check_out_stamp': {
                            'name': 'Check-Out',
                            'type': 'datetime',
                        },
                    }],
                    'section_stage': '7',
                },
            ],
        },
        'Greeting': {
            'sections': [
                {
                    'section_name': 'Check-In',
                    'section_type': 'Check-In',
                    'section_fields': [{
                        'check_in_stamp': {
                            'name': 'Check-In',
                            'type': 'datetime',
                        },
                    }],
                    'section_stage': '1',
                },
                {
                    'section_name': 'Greeted Guest',
                    'section_type': 'Checklist Boolean',
                    'section_fields': [],
                    'section_stage': '2',
                },
                {
                    'section_name': 'Checklist',
                    'section_type': 'Questions',
                    'section_fields': [{
                        'comments': {
                            'name': 'Comments',
                            'type': 'text',
                        },
                    }],
                    'section_stage': '3',
                },
                {
                    'section_name': 'Check-Out',
                    'section_type': 'Check-Out',
                    'section_fields': [{
                        'check_out_stamp': {
                            'name': 'Check-Out',
                            'type': 'datetime',
                        },
                    }],
                    'section_stage': '4',
                },
            ],
        }
    } 
  }

  checklistInfo() {
      return this.checklistInfoDict;
  }
}