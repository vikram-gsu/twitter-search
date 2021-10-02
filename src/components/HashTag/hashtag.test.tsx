import {screen, fireEvent, render} from '@testing-library/react';
import HashTag, {HashTagProps} from '.';

describe('HashTag component', ()=> {
    const hashTagProps: HashTagProps = {
        value: 'nasa',
        selected: false,
        onHashTagClick: jest.fn()
    }
    test('renders as expected', ()=> {
        render(<HashTag {...hashTagProps} />);
        
        expect(screen.getByRole('button', {
            name: /nasa/
        })).toBeInTheDocument();
        
    });
    
    test('invokes click event', ()=> {
        render(<HashTag {...hashTagProps} />);
        
        fireEvent.click(screen.getByRole('button'));

        expect(hashTagProps.onHashTagClick).toBeCalledTimes(1);
    });
})