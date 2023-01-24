/**
 * accountHelper.js
 * Created by Kevin Li 3/24/17
 */

import moment from 'moment';

export const getSubmissionDeadlines = (fiscalYear, fiscalPeriod, submissionPeriods) => {
    if (!submissionPeriods.length) return null;
    const submissionPeriod = submissionPeriods
        .find((submission) => submission.submission_fiscal_year === fiscalYear && submission.submission_fiscal_month === fiscalPeriod);
    if (!submissionPeriod) return null;
    return { submissionDueDate: submissionPeriod.submission_due_date, certificationDueDate: submissionPeriod.certification_due_date };
};

export const getLatestPeriod = (availablePeriods, fy = null) => {
    if (availablePeriods.length) {
        return availablePeriods
            .filter((s) => {
                if (fy) {
                    return s.submission_fiscal_year === parseInt(fy, 10);
                }
                return true;
            })
            .map((s) => ({
                revealDate: moment.utc(s.submission_reveal_date),
                asOfDate: moment.utc(s.period_end_date),
                period: s.submission_fiscal_month,
                year: s.submission_fiscal_year,
                quarter: s.submission_fiscal_quarter
            }))
            .sort(({ revealDate: a }, { revealDate: b }) => b.valueOf() - a.valueOf())
            .find(({ revealDate: s }) => moment(s).isSameOrBefore(moment()));
    }

    return {
        revealDate: null,
        asOfDate: null,
        period: null,
        year: null,
        quarter: null
    };
};

export const getLatestPeriodAsMoment = (availablePeriods) => {
    if (availablePeriods.length) {
        return getLatestPeriod(availablePeriods).asOfDate;
    }
    return {
        revealDate: null,
        asOfDate: null,
        period: null,
        year: null,
        quarter: null
    };
};

