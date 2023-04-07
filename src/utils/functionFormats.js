import telephoneHorsMetropole from '../data/indicatifs.json';

export const formatTelephone = (tel, codeDepartement) => {

  const REGEX_PHONE_DEBUT = /^(?:\+)(33|590|596|594|262|269)/;
  const REGEX_ZERO = /^(?:(?:\+)(33|590|596|594|262|269))([1-9])/g; // controle du zero après +XXX
  const REGEX_PHONE = /^(?:(?:\+)(33|590|596|594|262|269))(?:\d{3}){3}$/;

  const findIndicatif = telephoneHorsMetropole.find(r => r.codeDepartement === codeDepartement);

  const condition = value => !REGEX_PHONE_DEBUT.test(value) ? `${findIndicatif?.indicatif ?? '+33'}${value.substr(1)}` : value;
  let telephone = tel?.trim();
  telephone = telephone ? condition(telephone) : '';
  if (!REGEX_ZERO.test(telephone) || !REGEX_PHONE.test(telephone)) {
    telephone = null;
  }

  return telephone;
};

export const formatRue = (rue, type, voie) => {
  return rue?.toUpperCase() ?? [type ?? '', voie ?? ''].join(' ').toUpperCase();
};

export const formatAdresse = (adressePermanence, adresseStructure = null, rue = null) => {
  return [
    adressePermanence?.numeroRue ?? adresseStructure?.numero_voie ?? '',
    adressePermanence?.rue ?? rue ?? '',
    adressePermanence?.codePostal ?? adresseStructure?.code_postal ?? '',
    adressePermanence?.ville ?? adresseStructure?.localite ?? ''
  ].join(' ').toUpperCase();
};
