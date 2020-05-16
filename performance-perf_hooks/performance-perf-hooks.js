const { readFileSync } = require('fs');
const { performance, PerformanceObserver } = require('perf_hooks');

// triggered whenever a new entry is added to the performance timeline
const obs = new PerformanceObserver(items => {
    // give out the new entry of the performance timeline, when added
    console.log(items.getEntries())

    // to remove the performance marks in the timeline (optional)
    performance.clearMarks()
})

// subscribed the PerformanceObserver to new entries of the "measure" type
obs.observe({ entryTypes: ['measure'] })

performance.mark('BigFileStart')
readFileSync('./big.txt')
performance.mark('BigFileEnd')

// measuring from start to end of reading the big file
performance.measure('Big File', 'BigFileStart', 'BigFileEnd')

performance.mark('SmallFileStart')
readFileSync('./small.txt')
performance.mark('SmallFileEnd')

// measuring from start to end of reading the small file
performance.measure('Small File', 'SmallFileStart', 'SmallFileEnd')