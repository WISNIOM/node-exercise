import { Match } from './types';

type SportNameFormatMap = {
    [key in Match['sport']]?: string;
};

export class EventParser {
    private nameFormatMap: SportNameFormatMap = {
        soccer: ' - ',
        tennis: ' vs ',
        volleyball: ' - ',
        handball: ' vs ',
        basketball: ' - ',
    };

    makeEventName(match: Match) {
        const separator = this.nameFormatMap[match.sport];
        if ('participant1' in match && 'participant2' in match) {
            return `${match.participant1}${separator}${match.participant2}`;
        }
        return 'Exception: invalid sport';
    }

    formatScore(match: Match) {
        switch (match.sport) {
            case 'soccer':
                return match.score;
            case 'tennis':
                const tennisScores = match.score.split(',');
                return `Main score: ${tennisScores[0]} (set1 ${tennisScores[1]}, set2 ${tennisScores[2]}, set3 ${tennisScores[3]})`;
            case 'volleyball':
                const volleyballScores = match.score.split(',');
                return `Main score: ${volleyballScores[0]} (set1 ${volleyballScores[1]}, set2 ${volleyballScores[2]}, set3 ${volleyballScores[3]})`;
            case 'handball':
                return match.score;
            case 'basketball':
                return match.score
                    .map((quarter) => quarter.join(','))
                    .join(',');
            default:
                return 'Exception: invalid sport';
        }
    }
}
