import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Scholarship {
  id: string;
  name: string;
  amount: string;
  description: string;
  eligibility: string[];
  deadline: string;
}

interface ApplicationForm {
  id: string;
  name: string;
  fileName: string;
  description: string;
}

@Component({
  selector: 'app-scholarships',
  imports: [CommonModule],
  templateUrl: './scholarships.html',
  styleUrl: './scholarships.scss',
})
export class Scholarships {
  scholarships: Scholarship[] = [
    {
      id: 'amelia-earhart',
      name: 'Amelia Earhart Fellowship',
      amount: '$10,000',
      description:
        'Awarded to women pursuing Ph.D./doctoral degrees in aerospace engineering and space sciences.',
      eligibility: [
        'Women aged 18-30',
        'Must be registered in a full-time Ph.D./doctoral program and have completed at least one year of that program',
        'OR have received a master’s degree in an aerospace - applied field at the time the application is submitted.',
      ],
      deadline: 'Deadline to Apply for 2026 is closed. Please check back in August 2026.',
    },
    {
      id: 'young-women-leadership',
      name: 'Young Women in Leadership',
      amount: '$10,000',
      description:
        'Recognizing young women who demonstrate active commitment to volunteerism and leadership in their communities and workplaces.',
      eligibility: [
        'Young women ages 16-19',
        'Active commitment to volunteerism',
        'Experience in local government, student government, or workplace leadership (paid or unpaid)',
        'Volunteer leadership achievements',
        'Knowledge of Zonta International and its programs',
        'Support in Zonta International\'s mission of building a better world for women and girls',
      ],
      deadline: 'Now Open',
    },
    {
      id: 'young-women',
      name: 'Young Women in STEM',
      amount: '$10,000',
      description:
        'Awarded to women pursuing careers in science, technology, engineering, or mathematics (STEM).',
      eligibility: [
        'Women aged 18-30',
        'Currently enrolled in accredited institution',
        'Minimum 3.0 GPA',
        'Demonstrated commitment to STEM field',
      ],
      deadline: 'Jan 25, 2026',
    },
  ];

  applicationForms: ApplicationForm[] = [
    {
      id: 'general-application',
      name: 'General Application Form',
      fileName: 'zonta-scholarship-application-2025.pdf',
      description: 'Comprehensive application form for all Zonta Club Naples scholarships',
    },
    {
      id: 'essay-prompt',
      name: 'Essay Prompt Guide',
      fileName: 'zonta-essay-guidelines-2025.pdf',
      description: 'Guidelines and prompts for scholarship essays',
    },
    {
      id: 'recommendation-letter',
      name: 'Letter of Recommendation Template',
      fileName: 'zonta-recommendation-letter-template.pdf',
      description: 'Template for recommenders to complete',
    },
  ];

  downloadForm(form: ApplicationForm) {
    const link = document.createElement('a');
    link.href = `/assets/documents/${form.fileName}`;
    link.download = form.fileName;
    link.click();
  }
}
