# The value, risk, and cost of enterprise web application software

I recently spent some time thinking about the value, risk, and cost of the software that I've produced in my career. At a high level, I've come up with the following:

## Value

- Mitigate risk of human error.
- Improve process efficiency.
- Codify knowledge.
- Store, modify, analyze, and review data.
- Communicate between parties.
- Convenience.

## Risk

- Business becomes hostage to software, unable to function without it.
- Processes become rigid, unable to change without changing underlying software.
- Software errors possibly more catastrophic than human errors.

## Cost

I can attempt to estimate the cost of an application by:

1. Estimating the members of the team and their wages.
2. Estimating management and their wages.
3. Estimating possible license fees.
4. Estimating possible resource usage.

Err'ig on the less-expensive side:

| Role                | Cost per hour | Cost per day | Cost per week | Cost per year |
| ------------------- | :------------ | :----------- | :------------ | :------------ |
| QA                  | $50           |              |               |               |
| Developer           | $50           |              |               |               |
| Developer           | $50           |              |               |               |
| Platform engineer   | $50           |              |               |               |
| Database admin      | $50           |              |               |               |
| Business analyst    | $50           |              |               |               |
| **Total**           | $300          | $2,400       | $12,000       | $624,000      |
|                     |               |              |               |               |
| Management          | $50           |              |               |               |
| Management          | $50           |              |               |               |
| **Total**           | $100          | $500         | $3,500        | $182,000      |
|                     |               |              |               |               |
| Compute/storage     | $0.10         | $2.40        | $16.80        | $873          |
| Database license    |               |              |               | $10,000       |
| IDE license         |               |              |               | $1,200        |
| **Total**           |               |              |               | $13,000       |
|                     |               |              |               |               |
| **TOTAL**           |               |              |               | **$819,000**  |

## Conclusion

- Software can provide value when a simple task is identified that is repeated at a large scale and can be automated.
- Because software only becomes useful at such a large scale, the risk is higher as well.
- The entry-level cost of basic enterprise-level web application software _(the software that I'm accustomed to working on)_ can easily reach $1 million.
