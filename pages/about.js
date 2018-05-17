import React from 'react';

import Index from './index';

export default class About extends React.PureComponent {
    renderContent() {
        return (
            <div className='about'>
                <h1>About <strong>Today in Public Data</strong></h1>
                <p>TIPD searches datasets from Enigma Public, a free search and discovery platform for public data, using several different date formats.</p>
                <style jsx>{`
                    .about {
                        max-width: 1040px;
                        padding: 80px 20px;
                        margin: 0 auto;
                        flex-grow:1;
                    }

                    h1 {
                        font-weight: normal;
                    }
                `}</style>
            </div>
        );
    }

    render() {
        return (<Index content={this.renderContent()}/>);
    }
}
