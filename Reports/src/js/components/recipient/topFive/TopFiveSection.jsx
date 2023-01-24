/**
 * TopFiveSection.jsx
 * Created by Kwadwo Opoku-Debrah 07/10/18
 */

import React from 'react';

import { recipientCategories as topCategories } from 'dataMapping/recipients/topCategories';
import TopFiveContainer from 'containers/recipient/topFive/TopFiveContainer';

export default class TopFiveSection extends React.Component {
    render() {
        const content = topCategories.map((category, i) => {
            if (i % 2 === 0) {
                return (
                    <div key={category} className="category-row">
                        <TopFiveContainer
                            key={category}
                            category={category} />
                        <TopFiveContainer
                            key={topCategories[i + 1]}
                            category={topCategories[i + 1]} />
                    </div>
                );
            }
            return false;
        });

        return (
            <div
                className="recipient-section topfive"
                id="recipient-top-five">
                <h3 className="state-section__title">
                    Top 5
                </h3>
                <hr className="results-divider" />
                <div className="state-section__description">
                    The set of tables below provide a summary of awards to this recipient through multiple angles. To see more than the top 5, you can visit our Advanced Search page.
                </div>
                <div className="topfive__content">
                    {content}
                </div>
            </div>
        );
    }
}
