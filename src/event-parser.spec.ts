import { EventParser } from './event-parser';
import { Match } from './types';

describe('EventParser', () => {
    let parser: EventParser;

    beforeEach(() => {
        parser = new EventParser();
    });

    describe('makeEventName', () => {
        it('should return correct name for soccer match', () => {
            const match: Match = {
                sport: 'soccer',
                participant1: 'Chelsea',
                participant2: 'Arsenal',
                score: '2:1',
            };
            expect(parser.makeEventName(match)).toBe('Chelsea - Arsenal');
        });

        it('should return correct name for tennis match', () => {
            const match: Match = {
                sport: 'tennis',
                participant1: 'Maria Sharapova',
                participant2: 'Serena Williams',
                score: '2:1,7:6,6:3,6:7',
            };
            expect(parser.makeEventName(match)).toBe(
                'Maria Sharapova vs Serena Williams'
            );
        });

        it('should return correct name for volleyball match', () => {
            const match: Match = {
                sport: 'volleyball',
                participant1: 'Germany',
                participant2: 'France',
                score: '3:0,25:23,25:19,25:21',
            };
            expect(parser.makeEventName(match)).toBe('Germany - France');
        });

        it('should return correct name for handball match', () => {
            const match: Match = {
                sport: 'handball',
                participant1: 'Pogoń Szczeciń',
                participant2: 'Azoty Puławy',
                score: '34:26',
            };
            expect(parser.makeEventName(match)).toBe(
                'Pogoń Szczeciń vs Azoty Puławy'
            );
        });

        it('should return correct name for basketball match', () => {
            const match: Match = {
                sport: 'basketball',
                participant1: 'GKS Tychy',
                participant2: 'GKS Katowice',
                score: [
                    ['9:7', '2:1'],
                    ['5:3', '9:9'],
                ],
            };
            expect(parser.makeEventName(match)).toBe(
                'GKS Tychy - GKS Katowice'
            );
        });

        it('should return exception for ski jumping match', () => {
            const match: Match = {
                sport: 'ski jumping',
            };
            expect(parser.makeEventName(match)).toBe(
                'Exception: invalid sport'
            );
        });

        it('should return exception for invalid sport', () => {
            const match: Match = {
                sport: 'invalid sport',
            } as unknown as Match;
            expect(parser.makeEventName(match)).toBe(
                'Exception: invalid sport'
            );
        });
    });

    describe('formatScore', () => {
        it('should return correct score for soccer match', () => {
            const match: Match = {
                sport: 'soccer',
                participant1: 'Chelsea',
                participant2: 'Arsenal',
                score: '2:1',
            };
            expect(parser.formatScore(match)).toBe('2:1');
        });

        it('should return correct score for tennis match', () => {
            const match: Match = {
                sport: 'tennis',
                participant1: 'Maria Sharapova',
                participant2: 'Serena Williams',
                score: '2:1,7:6,6:3,6:7',
            };
            expect(parser.formatScore(match)).toBe(
                'Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)'
            );
        });

        it('should return correct score for volleyball match', () => {
            const match: Match = {
                sport: 'volleyball',
                participant1: 'Germany',
                participant2: 'France',
                score: '3:0,25:23,25:19,25:21',
            };
            expect(parser.formatScore(match)).toBe(
                'Main score: 3:0 (set1 25:23, set2 25:19, set3 25:21)'
            );
        });

        it('should return correct score for handball match', () => {
            const match: Match = {
                sport: 'handball',
                participant1: 'Pogoń Szczeciń',
                participant2: 'Azoty Puławy',
                score: '34:26',
            };
            expect(parser.formatScore(match)).toBe('34:26');
        });

        it('should return correct score for basketball match', () => {
            const match: Match = {
                sport: 'basketball',
                participant1: 'GKS Tychy',
                participant2: 'GKS Katowice',
                score: [
                    ['9:7', '2:1'],
                    ['5:3', '9:9'],
                ],
            };
            expect(parser.formatScore(match)).toBe('9:7,2:1,5:3,9:9');
        });

        it('should return exception for ski jumping', () => {
            const match: Match = {
                sport: 'ski jumping',
            };
            expect(parser.formatScore(match)).toBe('Exception: invalid sport');
        });

        it('should return exception for invalid sport', () => {
            const match: Match = {
                sport: 'invalid sport',
            } as unknown as Match;
            expect(parser.formatScore(match)).toBe('Exception: invalid sport');
        });
    });
});
