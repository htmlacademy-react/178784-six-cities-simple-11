import { MAX_GALARY_IMG_COUNT } from '../../constants/const';
import { WithOfferProps } from '../../types/types';

function PropertyGalery({offer}: WithOfferProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {offer.images.slice(0, MAX_GALARY_IMG_COUNT).map((image) =>
          (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt={offer.description} />
            </div>)
        )}
      </div>
    </div>);
}

export default PropertyGalery;
