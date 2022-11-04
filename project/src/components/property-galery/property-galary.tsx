import { WithOfferProps } from '../../types/with-offer-props.type';

function PropertyGalery({offer}: WithOfferProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {offer.images.slice(0, 6).map((image) =>
          (
            <div key={image} className="property__image-wrapper">
              <img className="property__image" src={image} alt={offer.description} />
            </div>)
        )}
      </div>
    </div>);
}

export default PropertyGalery;
