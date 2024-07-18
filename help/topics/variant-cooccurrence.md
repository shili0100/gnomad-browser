---
id: variant-cooccurrence
title: 'Variant co-occurrence'
---

Recessive diseases arise when both the maternal and the paternal copies of a gene are impacted by a damaging genetic variant in the affected individual. When a patient carries two different potentially causal variants in a gene for a given disorder, accurate diagnosis requires determining that these two variants occur on different copies of the chromosome (i.e., are in trans) rather than on the same copy (i.e., in cis). However, current approaches for determining phase, beyond parental testing, are limited in clinical settings.

To help with these challenges, we have released inferred phasing data for all pairs of variants within a gene where both variants have a global allele frequency in gnomAD v2.1.1 exomes <5% and are either coding, flanking intronic (from position -1 to -3 in acceptor sites, and +1 to +8 in donor sites), or in the 5’/3’ UTRs. On the browser, over 5.3 billion pairs of variants across 19,685 genes can be queried. We have also released a file of 20,921,100 pairs of variants that were seen at least once in the same individual. As a note: if a pair of qualifying variants is not in this file, it indicates that the two variants were never seen together in the same individual, and therefore we would infer that these variants are in trans. To learn more about this approach please read our [blog post](https://gnomad.broadinstitute.org/news/2021-07-variant-co-occurrence-phasing-information-in-gnomad/) or [paper](https://www.nature.com/articles/s41588-023-01608-3).

Additionally, we have incorporated cumulative counts of gnomAD individuals carrying pairs of rare co-occurring variants within genes in the gnomAD v2 browser across various allele frequencies and functional consequences. These counts can be used to evaluate how frequently rare variant co-occurrence is observed in a large reference population. To read more about this approach, how to access this data in the browser, as well as limitations please see our [blog post](https://gnomad.broadinstitute.org/news/2023-03-variant-co-occurrence-counts-by-gene-in-gnomad/). Additionally you can read our paper [here](https://www.nature.com/articles/s41588-023-01608-3).