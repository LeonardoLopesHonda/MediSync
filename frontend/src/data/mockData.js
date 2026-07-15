// Demo content transcribed from the MediSync design mockups. Symptom search,
// triage, and location lookup aren't implemented yet (see docs/MILESTONES.md
// M1-M3) — this is the single place to swap in real API data once they land.

export const chips = [
  { label: 'Headache & fatigue' },
  { label: 'Chest tightness' },
  { label: 'Sore throat & fever' },
  { label: 'Joint pain' },
]

export const stats = [
  { value: '24/7', label: 'Availability' },
  { value: '1,200+', label: 'Verified specialists' },
  { value: '<2min', label: 'Avg. response time' },
]

export const causes = [
  {
    name: 'Tension-type headache',
    likelihood: 'High',
    tagBg: '#fef2f2',
    tagColor: '#b91c1c',
    description:
      'Common and often linked to stress, poor posture, or eye strain. Usually resolves with rest and hydration.',
    specialist: 'General Practitioner',
  },
  {
    name: 'Migraine',
    likelihood: 'Medium',
    tagBg: '#fffbeb',
    tagColor: '#b45309',
    description:
      'Recurring headaches often paired with visual disturbances and light sensitivity.',
    specialist: 'Neurologist',
  },
  {
    name: 'Dehydration',
    likelihood: 'Medium',
    tagBg: '#fffbeb',
    tagColor: '#b45309',
    description:
      'Low fluid intake can cause fatigue, headache, and dizziness, especially in warm weather.',
    specialist: 'General Practitioner',
  },
  {
    name: 'Vision strain',
    likelihood: 'Low',
    tagBg: '#eff6ff',
    tagColor: '#1d4ed8',
    description: 'Extended screen time can cause blurred vision and secondary headaches.',
    specialist: 'Ophthalmologist',
  },
]

export const providers = [
  {
    id: '1',
    name: 'Dr. Amara Whitfield',
    specialty: 'Neurology',
    distance: '1.2 mi',
    rating: '4.9',
    availability: 'Today',
  },
  {
    id: '2',
    name: 'Riverside General Hospital',
    specialty: 'Emergency & General',
    distance: '2.0 mi',
    rating: '4.6',
    availability: 'Open now',
  },
  {
    id: '3',
    name: 'Dr. Elias Kanu',
    specialty: 'Ophthalmology',
    distance: '3.4 mi',
    rating: '4.8',
    availability: 'Tomorrow',
  },
]

export const pins = [
  { left: '30%', top: '35%' },
  { left: '55%', top: '55%' },
  { left: '70%', top: '25%' },
  { left: '20%', top: '65%' },
]

export const providersById = {
  '1': {
    name: 'Dr. Amara Whitfield',
    specialty: 'Neurology',
    rating: '4.9',
    reviews: '212',
    distance: '1.2 mi',
    address: '440 Cedar Grove Ave, Suite 210',
    phone: '(555) 012-4488',
    insurance: 'Most major providers accepted',
    about:
      'Dr. Whitfield is a board-certified neurologist specializing in headache disorders and migraine management, with over 12 years of clinical experience.',
    slots: ['9:00 AM', '10:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '4:30 PM', '5:15 PM', '6:00 PM'],
  },
  '2': {
    name: 'Riverside General Hospital',
    specialty: 'Emergency & General Medicine',
    rating: '4.6',
    reviews: '1,048',
    distance: '2.0 mi',
    address: '18 Riverside Parkway',
    phone: '(555) 019-2200',
    insurance: 'Most major providers accepted',
    about:
      'A full-service general hospital with 24/7 emergency care, diagnostic imaging, and a dedicated neurology unit.',
    slots: ['Walk-in', 'Walk-in', '11:00 AM', '1:30 PM', '3:00 PM', '5:00 PM', '6:30 PM', '8:00 PM'],
  },
  '3': {
    name: 'Dr. Elias Kanu',
    specialty: 'Ophthalmology',
    rating: '4.8',
    reviews: '156',
    distance: '3.4 mi',
    address: '75 Meadowbrook St, Suite 4B',
    phone: '(555) 044-7731',
    insurance: 'Most major providers accepted',
    about:
      'Dr. Kanu focuses on vision strain, refractive concerns, and comprehensive eye exams for adults and adolescents.',
    slots: ['8:30 AM', '9:15 AM', '12:00 PM', '1:45 PM', '3:15 PM', '4:00 PM', '5:30 PM', '6:15 PM'],
  },
}

export const reviews = [
  {
    name: 'Jordan M.',
    rating: '5.0',
    text: 'Thorough, patient, and explained everything clearly. Highly recommend.',
  },
  {
    name: 'Priya S.',
    rating: '4.5',
    text: 'Short wait time and very attentive. Would book again.',
  },
]
