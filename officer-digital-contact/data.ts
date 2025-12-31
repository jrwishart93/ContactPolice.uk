import { OfficerDetails } from './types';

const COMMON_OFFICE = {
  team: 'Team 2',
  department: 'Road Policing Unit',
  hqName: 'Edinburgh Police HQ',
  addressLine1: '5 Fettes Avenue',
  city: 'Edinburgh',
  postcode: 'EH4 1RB',
  telephone: '101',
};

export const TEAM_DATA: Record<string, OfficerDetails> = {
  'T206': { ...COMMON_OFFICE, rank: 'Sgt', name: 'Paul Ewing', shoulderNumber: 'T206', email: 'paul.ewing@scotland.police.uk' },
  'T159': { ...COMMON_OFFICE, rank: 'PC', name: 'D Niven', shoulderNumber: 'T159', email: 'david.niven@scotland.police.uk' },
  'T321': { ...COMMON_OFFICE, rank: 'PC', name: 'J Smith', shoulderNumber: 'T321', email: '9876543@scotland.police.uk' },
  'T218': { ...COMMON_OFFICE, rank: 'PC', name: 'J Murphy', shoulderNumber: 'T218', email: 'john.murphy@scotland.police.uk' },
  'T371': { ...COMMON_OFFICE, rank: 'PC', name: 'S Hancock', shoulderNumber: 'T371', email: 'steven.hancock@scotland.police.uk' },
  'T245': { ...COMMON_OFFICE, rank: 'PC', name: 'C Beddows', shoulderNumber: 'T245', email: 'c.beddows@scotland.police.uk' },
  'T329': { ...COMMON_OFFICE, rank: 'PC', name: 'J Wishart', shoulderNumber: 'T329', email: 'j.wishart@scotland.police.uk' },
  'T368': { ...COMMON_OFFICE, rank: 'PC', name: 'A Jardine', shoulderNumber: 'T368', email: 'a.jardine@scotland.police.uk' },
  'T403': { ...COMMON_OFFICE, rank: 'PC', name: 'L Corner', shoulderNumber: 'T403', email: 'l.corner@scotland.police.uk' },
};