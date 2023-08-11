import { KandidatCv } from 'felles/domene/kandidat/Kandidat';
import useKandidat, { kandidatnrTerm } from 'felles/komponenter/banner/useKandidat';
import { Brødsmule } from 'felles/komponenter/kandidatbanner/BrødsmuleKomponent';
import Kandidatbanner from 'felles/komponenter/kandidatbanner/Kandidatbanner';
import { Nettressurs } from 'felles/nettressurs';
import useMaskerFødselsnumre from '../../../app/useMaskerFødselsnumre';
import css from './Kandidatheader.module.css';
import ForrigeNeste, { Kandidatnavigering } from './forrige-neste/ForrigeNeste';

type Props = {
    cv: Nettressurs<KandidatCv>;
    kandidatnr: string;
    kandidatnavigering: Kandidatnavigering | null;
    brødsmulesti?: Brødsmule[];
};

const Kandidatheader = ({ kandidatnavigering, kandidatnr, brødsmulesti }: Props) => {
    useMaskerFødselsnumre();
    const { kandidat } = useKandidat(kandidatnrTerm(kandidatnr));

    return (
        <>
            <Kandidatbanner
                kandidat={kandidat}
                brødsmulesti={brødsmulesti}
                toppHoyre={
                    kandidatnavigering && (
                        <div className={css.forrigeNeste}>
                            <ForrigeNeste kandidatnavigering={kandidatnavigering} />
                        </div>
                    )
                }
            ></Kandidatbanner>
        </>
    );
};

export default Kandidatheader;
