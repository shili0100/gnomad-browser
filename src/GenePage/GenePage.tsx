// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
import LeftArrow from '@fortawesome/fontawesome-free/svgs/solid/arrow-circle-left.svg'
// @ts-expect-error TS(2307) FIXME: Cannot find module '@fortawesome/fontawesome-free/... Remove this comment to see the full error message
import RightArrow from '@fortawesome/fontawesome-free/svgs/solid/arrow-circle-right.svg'
import React, { useState, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'

// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
import { Track } from '@gnomad/region-viewer'
// @ts-expect-error TS(7016) FIXME: Could not find a declaration file for module '@gno... Remove this comment to see the full error message
import { TranscriptPlot } from '@gnomad/track-transcripts'
import { Badge, Button } from '@gnomad/ui'

import {
  DatasetId,
  genesHaveExomeCoverage,
  genesHaveGenomeCoverage,
  labelForDataset,
  hasStructuralVariants,
  ReferenceGenome,
  hasExons,
  isExac,
  hasCopyNumberVariants,
  isV2,
} from '../../dataset-metadata/metadata'
import ConstraintTable from '../ConstraintTable/ConstraintTable'
import VariantCooccurrenceCountsTable, {
  HeterozygousVariantCooccurrenceCountsPerSeverityAndAf,
  HomozygousVariantCooccurrenceCountsPerSeverityAndAf,
} from './VariantCooccurrenceCountsTable'

import DocumentTitle from '../DocumentTitle'
import GnomadPageHeading from '../GnomadPageHeading'
import InfoButton from '../help/InfoButton'
import Link from '../Link'
import RegionalConstraintTrack from '../RegionalConstraintTrack'
import RegionalMissenseConstraintTrack, {
  RegionalMissenseConstraint,
} from '../RegionalMissenseConstraintTrack'
import RegionCoverageTrack from '../RegionPage/RegionCoverageTrack'
import RegionViewer from '../RegionViewer/ZoomableRegionViewer'
import { TrackPage, TrackPageSection } from '../TrackPage'
import { useWindowSize } from '../windowSize'

import GeneCoverageTrack from './GeneCoverageTrack'
import GeneFlags from './GeneFlags'
import GeneInfo from './GeneInfo'
import GeneTranscriptsTrack from './GeneTranscriptsTrack'
import MitochondrialGeneCoverageTrack from './MitochondrialGeneCoverageTrack'
import MitochondrialVariantsInGene from './MitochondrialVariantsInGene'
import { getPreferredTranscript } from './preferredTranscript'
import StructuralVariantsInGene from './StructuralVariantsInGene'
import TissueExpressionTrack from './TissueExpressionTrack'
import VariantsInGene from './VariantsInGene'

import { GnomadConstraint } from '../ConstraintTable/GnomadConstraintTable'
import { ExacConstraint } from '../ConstraintTable/ExacConstraintTable'
import {
  Variant,
  ClinvarVariant,
  StructuralVariant,
  CopyNumberVariant,
} from '../VariantPage/VariantPage'
import CopyNumberVariantsInGene from './CopyNumberVariantsInGene'
import {
  ControlPanel,
  Legend,
  LegendItemWrapper,
  Label,
  CheckboxInput,
  LegendSwatch,
} from '../ChartStyles'
import { logButtonClick } from '../analytics'

export type Strand = '+' | '-'

export type GeneMetadata = {
  gene_id: string
  gene_version: string
  symbol: string
  mane_select_transcript?: {
    ensembl_id: string
    ensembl_version: string
    refseq_id: string
    refseq_version: string
  }
  canonical_transcript_id: string | null
  flags: string[]
}

export type Gene = GeneMetadata & {
  reference_genome: ReferenceGenome
  name?: string
  chrom: string
  strand: Strand
  start: number
  stop: number
  exons: {
    feature_type: string
    start: number
    stop: number
  }[]
  transcripts: {
    transcript_id: string
    transcript_version: string
    exons: {
      feature_type: string
      start: number
      stop: number
    }[]
  }[]
  flags: string[]
  gnomad_constraint?: GnomadConstraint
  exac_constraint?: ExacConstraint
  pext?: {
    regions: {
      start: number
      stop: number
      mean: number
      tissues: {
        [key: string]: number
      }
    }[]
    flags: string[]
  }
  short_tandem_repeats?: {
    id: string
  }[]
  exac_regional_missense_constraint_regions?: any
  gnomad_v2_regional_missense_constraint?: RegionalMissenseConstraint
  variants: Variant[]
  structural_variants: StructuralVariant[]
  copy_number_variants: CopyNumberVariant[]
  clinvar_variants: ClinvarVariant[]
  homozygous_variant_cooccurrence_counts: HomozygousVariantCooccurrenceCountsPerSeverityAndAf
  heterozygous_variant_cooccurrence_counts: HeterozygousVariantCooccurrenceCountsPerSeverityAndAf
}

const GeneName = styled.span`
  overflow: hidden;
  font-size: 0.75em;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const GeneInfoColumnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1em;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }

  /* Matches responsive styles in AttributeList */
  @media (max-width: 600px) {
    align-items: stretch;
  }
`

const GeneInfoColumn = styled.div`
  width: 40%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

const ConstraintOrCooccurrenceColumn = styled.div`
  width: 55%;

  @media (max-width: 1200px) {
    width: 100%;
  }
`

type TableName = 'constraint' | 'cooccurrence'

type TableSelectorProps = {
  ownTableName: TableName
  selectedTableName: TableName
  setSelectedTableName: Dispatch<SetStateAction<TableName>>
}

// prettier-ignore
const BaseTableSelector = styled.div<TableSelectorProps>

const TableSelector = BaseTableSelector.attrs(
  ({ setSelectedTableName, ownTableName }: TableSelectorProps) => ({
    onClick: () => {
      if (ownTableName === 'cooccurrence') {
        logButtonClick('User selected variant co-occurrence table on Gene page')
      }
      setSelectedTableName(ownTableName)
    },
  })
)`
  border: 1px solid black;
  border-radius: 0.5em;
  cursor: pointer;
  margin-right: 0.5em;
  padding: 0.25em;

  background-color: ${({ ownTableName, selectedTableName }: TableSelectorProps) =>
    ownTableName === selectedTableName ? '#cbd3da' : 'transparent'};
`

const TableSelectorWrapper = styled.div`
  display: flex;
`

const TrackWrapper = styled.div`
  margin-bottom: 1em;
`

const ToggleTranscriptsPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding-right: 5px;

  button {
    width: 70px;
    height: auto;
    padding-right: 0.25em;
    padding-left: 0.25em;
  }

  svg {
    fill: #424242;
  }
`

const CompositeTranscriptPlotWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`

const transcriptFeatureAttributes = {
  exon: {
    fill: '#bdbdbd',
    height: 4,
  },
  CDS: {
    fill: '#424242',
    height: 10,
  },
  UTR: {
    fill: '#424242',
    height: 4,
  },
}

type Props = {
  datasetId: DatasetId
  gene: Gene
  geneId: string
}

const GenePage = ({ datasetId, gene, geneId }: Props) => {
  const hasCDS = gene.exons.some((exon) => exon.feature_type === 'CDS')

  const [includeNonCodingTranscripts, setIncludeNonCodingTranscripts] = useState(!hasCDS)
  const [includeUTRs, setIncludeUTRs] = useState(false)
  const [showTranscripts, setShowTranscripts] = useState(false)
  const [selectedTableName, setSelectedTableName] = useState<TableName>('constraint')

  const { width: windowWidth } = useWindowSize()
  const isSmallScreen = windowWidth < 900

  // Subtract 30px for padding on Page component
  const regionViewerWidth = windowWidth - 30

  const cdsCompositeExons = gene.exons.filter((exon) => exon.feature_type === 'CDS')
  const hasCodingExons = cdsCompositeExons.length > 0
  const hasUTRs = gene.exons.some((exon) => exon.feature_type === 'UTR')
  const hasNonCodingTranscripts = gene.transcripts.some(
    (tx) => !tx.exons.some((exon) => exon.feature_type === 'CDS')
  )

  const regionViewerRegions = !hasExons(datasetId)
    ? [
        {
          start: Math.max(1, gene.start - 75),
          stop: gene.stop + 75,
        },
      ]
    : gene.exons
        .filter(
          (exon) =>
            exon.feature_type === 'CDS' ||
            (exon.feature_type === 'UTR' && includeUTRs) ||
            (exon.feature_type === 'exon' && includeNonCodingTranscripts)
        )
        .map((exon) => ({
          start: Math.max(1, exon.start - 75),
          stop: exon.stop + 75,
        }))

  const [zoomRegion, setZoomRegion] = useState(null)

  const { preferredTranscriptId, preferredTranscriptDescription } = getPreferredTranscript(gene)

  return (
    <TrackPage>
      <RegionViewer
        contextType="gene"
        leftPanelWidth={115}
        width={regionViewerWidth}
        regions={regionViewerRegions}
        rightPanelWidth={isSmallScreen ? 0 : 80}
      >
        <VariantsInGene
            datasetId={datasetId}
            gene={gene}
            // @ts-expect-error TS(2322) FIXME: Type '{ datasetId: string; gene: { gene_id: string... Remove this comment to see the full error message
            includeNonCodingTranscripts={includeNonCodingTranscripts}
            includeUTRs={includeUTRs}
            zoomRegion={zoomRegion}
        />
      </RegionViewer>
    </TrackPage>
  )
}

export default GenePage
