import { WithOfferProps } from '../../types/props';

function IsPremium({offer}: WithOfferProps): JSX.Element | null {
  return (offer.isPremium ?
    <div className="place-card__mark">
      <span>Premium</span>
    </div> :
    null
  );
}

export default IsPremium;
