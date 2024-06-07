import { BodyShort, Loader } from '@navikt/ds-react';
import * as React from 'react';
import { IKandidatSøk, useKandidatsøk } from '../api/kandidat-søk-api/kandidatsøk';
import { ApplikasjonContext } from '../felles/ApplikasjonContext';
import { FilterParam } from './hooks/useQuery';
import { IKandidatSøkekriterier, useKandidatSøkekriterier } from './hooks/useSøkekriterier';
import { lesSessionStorage, skrivSessionStorage } from './sessionStorage';

export type Økt = Partial<{
    searchParams: string;
    sistBesøkteKandidat: string;
    markerteKandidater: string[];
    navigerbareKandidater: string[];
    totaltAntallKandidater: number;
    pageSize: number;
    fritekst: string;
}>;

interface IØkt {
    forrigeØkt?: Økt;
    gjeldendeØkt: Økt;
    setØkt: (økt: Økt) => void;
}

interface ISøkekriterier {
    søkekriterier: IKandidatSøkekriterier;
    setSøkeparameter: (parameter: FilterParam, value: string | null) => void;
    fjernSøkekriterier: () => void;
}
interface IKandidatSøkContext {
    søkeResultat?: IKandidatSøk;
    kriterier: ISøkekriterier;
    økt: IØkt;
}

export const KandidatSøkContext = React.createContext<IKandidatSøkContext>({
    søkeResultat: undefined,
    kriterier: {
        //@ts-ignore
        søkekriterier: {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        fjernSøkekriterier: () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        setSøkeparameter: () => {},
    },
});

interface IKandidatSøkContextProvider {
    children?: React.ReactNode | undefined;
}

const sessionStorageKey = 'kandidatsøk';

export const KandidatSøkContextProvider: React.FC<IKandidatSøkContextProvider> = ({ children }) => {
    const { valgtNavKontor } = React.useContext(ApplikasjonContext);
    const forrigeØkt = lesSessionStorage(sessionStorageKey);
    const [gjeldendeØkt, setØkt] = React.useState<Økt>({});
    const { søkekriterier, setSearchParam, fjernSøkekriterier } =
        useKandidatSøkekriterier(gjeldendeØkt);

    React.useEffect(() => {
        if (!gjeldendeØkt && forrigeØkt) {
            setØkt(forrigeØkt);
        }
    }, [gjeldendeØkt, forrigeØkt]);

    const økt = React.useMemo(() => {
        const onSetØkt = (oppdaterteFelter: Økt) => {
            const oppdatertØkt = {
                ...gjeldendeØkt,
                ...oppdaterteFelter,
            };

            skrivSessionStorage(sessionStorageKey, oppdatertØkt);
            setØkt(oppdatertØkt);
        };

        return {
            forrigeØkt: forrigeØkt,
            gjeldendeØkt,
            setØkt: onSetØkt,
        };
    }, [gjeldendeØkt, forrigeØkt]);

    const { data, isLoading, error } = useKandidatsøk({
        søkekriterier,
        navKontor: valgtNavKontor?.navKontor ?? null,
    });

    const context: IKandidatSøkContext = {
        økt,
        kriterier: {
            søkekriterier,
            setSøkeparameter: setSearchParam,
            fjernSøkekriterier,
        },
        søkeResultat: data,
    };

    if (error) {
        return (
            <BodyShort
                // className={css.feilmelding}
                aria-live="assertive"
            >
                {error.message === '403' ? 'Du har ikke tilgang til kandidatsøket' : error.message}
            </BodyShort>
        );
    }

    if (isLoading) {
        return (
            <Loader
                variant="interaction"
                size="2xlarge"
                // className={css.lasterInn}
            />
        );
    }
    return <KandidatSøkContext.Provider value={context}>{children}</KandidatSøkContext.Provider>;
};
