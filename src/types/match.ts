import { BasketballMatch } from './basketball-match';
import { HandballMatch } from './handball-match';
import { SkiJumpingMatch } from './ski-jumping-match';
import { SoccerMatch } from './soccer-match';
import { TennisMatch } from './tennis-match';
import { VolleyballMatch } from './volleyball-match';

export type Match =
    | SoccerMatch
    | VolleyballMatch
    | HandballMatch
    | BasketballMatch
    | TennisMatch
    | SkiJumpingMatch;
