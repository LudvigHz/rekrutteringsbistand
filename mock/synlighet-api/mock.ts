import Synlighetsevaluering from 'felles/domene/synlighet/Synlighetsevaluering';
import { rest } from 'msw';
import { api } from '../../src/felles/api';

export const synlighetApiMock = [
    rest.get(`${api.synlighet}/evaluering/:fnr`, (_, res, ctx) =>
        res(ctx.json(mockSynlighetsevaluering))
    ),
];

const mockSynlighetsevaluering: Synlighetsevaluering = {
    harAktivCv: true,
    erIkkeDoed: true,
    erIkkeFritattKandidatsøk: true,
    erIkkeSperretAnsatt: true,
    erUnderOppfoelging: false,
    harJobbprofil: false,
    harRiktigFormidlingsgruppe: true,
    harSettHjemmel: false,
    maaIkkeBehandleTidligereCv: true,
};
