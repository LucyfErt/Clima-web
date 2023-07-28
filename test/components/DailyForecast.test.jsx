import { render } from "@testing-library/react";
import  { LocationSearh} from '../../src/components/Location/LocationSearch';

describe('Pruebas en LocationSearch', () => { 

    const Daily = ' Loading';

    test('Debe mostras Loading inicialmente ', () => { 

        render(<LocationSearh/>); 
     })
 })