import { useContext } from 'react';
import AbReactContext from './Context';

export function useAb() {
    return useContext(AbReactContext);
}
