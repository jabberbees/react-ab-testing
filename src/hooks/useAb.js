import { useContext } from 'react';
import AbReactContext from '../components/Context';

export function useAb() {
    return useContext(AbReactContext);
}
