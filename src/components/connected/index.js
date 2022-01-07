import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from '../Header';
import Statistics from './statistics/Statistics';
import Cra from './cra';
import Welcome from './Welcome';
import { useDispatch, useSelector } from 'react-redux';
import { conseillerActions, structureActions } from '../../actions';
import { userEntityId } from '../../helpers';
import FormulaireSexeAge from './FormulaireSexeAge';
import Ressourcerie from './ressourcerie/Ressourcerie';
import FormulaireHorairesAdresse from './formulaireHorairesAdresse/index';

function Connected() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authentication.user.user);
  const conseiller = useSelector(state => state?.conseiller?.conseiller);
  const voirFormulaire = useSelector(state => state?.conseiller?.showFormular);
  const formulaireIsUpdated = useSelector(state => state?.conseiller?.isUpdated);

  const structure = useSelector(state => state?.structure?.structure);
  const formulaireHorairesAdresseIsUpdated = useSelector(state => state?.formulaireHorairesAdresse?.isUpdated);
  const voirFormulaireHorairesAdresse = useSelector(state => state?.conseiller?.showFormularHorairesAdresse);

  useEffect(() => {
    if (conseiller) {
      dispatch(conseillerActions.isFormulaireChecked(conseiller.sexe, formulaireIsUpdated));
      dispatch(conseillerActions.isFormulaireHorairesAdresseChecked(conseiller?.informationsCartographie, formulaireHorairesAdresseIsUpdated));
      if (!structure) {
        dispatch(structureActions.get(conseiller.structureId));
      }
    } else {
      dispatch(conseillerActions.get(userEntityId()));
    }
  }, [conseiller]);

  return (
    <>
      <Header linkAccount={user?.name}/>
      {voirFormulaire &&
        <FormulaireSexeAge/>
      }
      {!user.pdfGenerator &&
      <>
        {!voirFormulaireHorairesAdresse &&
          <>
            <Route path={`/accueil`} component={Welcome} />
            <Route path={`/compte-rendu-activite`} component={Cra} />
            <Route path={`/statistiques`} component={Statistics} />
            <Route path={`/ressourcerie`} component={Ressourcerie} />
            <Route path={`/mes-informations`} component={FormulaireHorairesAdresse} />
            <Route exact path="/" render={() => (<Redirect to="/accueil" />)} />
          </>
        }
        {voirFormulaireHorairesAdresse &&
        <>
          <Route path={`/accueil`} component={FormulaireHorairesAdresse} />
          <Route path="/" render={() => (<Redirect to="/accueil" />)} />
        </>
        }
      </>
      }
      { user.pdfGenerator &&
        <>
          <Route path={`/statistiques`} component={Statistics} />
        </>
      }
    </>
  );
}

export default Connected;
