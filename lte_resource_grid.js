var isMSIE7;

var gridTopHdr7Elem;
var gridTopHdr6Elem;
var gridMainElem;
var gridMainPanElem;
var gridGrp7Elem;
var gridGrp6Elem;
var transmissionElem;
var dynTransmissionElem;
var mbsfnElem;
var ulElem;
var RS1stInactiveElem;
var RS1stInactivePanElem;
var RS1stActiveElem;
var RS1stActivePanElem;
var RSInactiveElem = new Array(10);
var RSInactivePanElem = new Array(10);
var RSActiveElem = new Array(10);
var RSActivePanElem = new Array(10);
var RSInactivePBCH0Elem;
var RSInactivePBCH0PanElem;
var RSInactivePBCH1Elem;
var RSInactivePBCH1PanElem;
var duplexCommentElem;
var tddUlDlCfgRowElem;
var tddUlDlCfgCommentElem;
var tddSpecSubfCfgRowElem;
var tddSpecSubfCfgCommentElem;
var bwCommentElem;
var cpCommentElem;
var cfiCommentElem;
var cfiTddSpecSubfRowElem;
var cfiTddSpecSubfCommentElem;
var cfiMbsfnRowElem;
var cfiMbsfnCommentElem;
var cellIdCommentElem;
var phichNgCommentElem;
var phichDurationCommentElem;
var mbsfnCommentElem;
var markerExtraRowElem;
var markerPcfichElem;
var markerPhichElem;
var markerPdcchElem;
var markerPdcchLogicalElem;
var markerCceRangeElem;
var markerPdcchPhysicalElem;
var markerPhyRegRangeElem;
var markerNoteElem;
var markerElem;
var markerClipElem;
var markerPanElem;
var directLinkElem;
var resetLinkElem;
var calcPdschLinkElem;

var link_param_list = new Array(
  "duplex_mode", "tdd_ul_dl_cfg", "tdd_spec_subf_cfg", "tdd_spec_subf_cfi",
  "bw", "cp", "n_tx_ports", "tx_port", "cell_id", "cfi", "phich_ng", "phich_dur", "mbsfn_subf", "mbsfn_cfi",
  "marker_type", "mrkr_subf", "mrkr_pcfich_reg", "mrkr_phich_reg", "mrkr_phich_map_unit",
  "mrkr_pdcch_reg_type",
  ["mrkr_pdcch_cce", "mrkr_pdcch_reg_type", "logical"],
  ["mrkr_pdcch_cce_reg", "mrkr_pdcch_reg_type", "logical"],
  ["mrkr_pdcch_phy_reg", "mrkr_pdcch_reg_type", "physical"]
  );
var link_args = new Array(link_param_list.length);

var gridFileList = new Array("images/resource_grid_7sym.png", "images/resource_grid_6sym.png");
var inactiveRSFile = "images/inactive_RS.png";
var activeRSFile = "images/active_RS.png";

var colorUnused = "#000000";
var colorPSCH = "#00FF00";
var colorSSCH = "#F0F000";
var colorPBCH = "#B0FFFF";
var colorRS   = "#FF0000";
var colorPCFICH = "#4040FF";
var colorPHICH = "#D000D0";
var colorPDCCH = "#E0B000";
var colorUL = "#008000";
var colorGP = "#D0D0D0";
var colorAvailable = "#FFFFFF";
var colorMBSFN = "#FFE0E0";
var colorMarker = "#FFFFFF";

var frameStructType;
var tddUlDlCfgs = new Array(
  ["D","S","U","U","U","D","S","U","U","U"],
  ["D","S","U","U","D","D","S","U","U","D"],
  ["D","S","U","D","D","D","S","U","D","D"],
  ["D","S","U","U","U","D","D","D","D","D"],
  ["D","S","U","U","D","D","D","D","D","D"],
  ["D","S","U","D","D","D","D","D","D","D"],
  ["D","S","U","U","U","D","S","U","U","D"]
  );
var tddUlDlCfgDescriptions =
  [
  "DL|UL|special subframes: 0,5 | 2-4,7-9 | 1,6",
  "DL|UL|special subframes: 0,4-5,9 | 2-3,7-8 | 1,6",
  "DL|UL|special subframes: 0,3-5,8-9 | 2,7 | 1,6",
  "DL|UL|special subframes: 0,5-9 | 2-4 | 1",
  "DL|UL|special subframes: 0,4-9 | 2-3 | 1",
  "DL|UL|special subframes: 0,3-9 | 2 | 1",
  "DL|UL|special subframes: 0,5,9 | 2-4,7-8 | 1,6"
  ];
var tddUlDlCfg;
var tddSpecSubfDlSyms = new Array(
  // Extended CP
  [3,8,9,10,3,8,9],
  // Normal CP
  [3,9,10,11,12,3,9,10,11,6]
  );
var tddSpecSubfUlSyms = new Array(
  // Extended CP
  [1,1,1,1,2,2,2],
  // Normal CP
  [1,1,1,1,1,2,2,2,2,2]
  );
var tddSpecSubfCfg;

// PDCCH type:
//   bits 3:2: PHICH factor (1 for FDD, 0,1, or 2 for TDD)
//   bits 1:0: 0 for normal, 1 for MBSFN, 2 for TDD subframes 1/6
// PDCCH type is one of these:
//   0: n PDCCH symbols and 0*g PHICH groups
//   1: m PDCCH symbols and 0*g PHICH groups
//   2: s PDCCH symbols and 0*g PHICH groups
//   4: n PDCCH symbols and 1*g PHICH groups
//   5: m PDCCH symbols and 1*g PHICH groups
//   6: s PDCCH symbols and 1*g PHICH groups
//   8: n PDCCH symbols and 2*g PHICH groups
// where
//   n is nbr of PDCCH symbols in normal subframe,
//   m is nbr of PDCCH symbols in MBSFN subframe,
//   s is nbr of PDCCH symbols in TDD subframes 1/6,
//   g is normal nbr of PHICH groups (as in FDD subframe)
var pdcchTypeList;
// subfPdcchTypeIndexes contains one index into pdcchTypeList for each subframe.
// Index is -1 for uplink subframes.
var subfPdcchTypeIndexes = new Array(10);
// PHICH type:
//   bits 3:2: PHICH factor (1 for FDD, 1 or 2 for TDD (type with factor 0 is not stored))
//   bits 1:0: number of PHICH symbols
// PHICH type is one of these (max 2 simultaneous types in a radio frame):
//   5: 1 PHICH symbol  and 1*g PHICH groups
//   6: 2 PHICH symbols and 1*g PHICH groups
//   7: 3 PHICH symbols and 1*g PHICH groups
//   9: 1 PHICH symbol  and 2*g PHICH groups
//  11: 3 PHICH symbols and 2*g PHICH groups
// where
//   g is normal nbr of PHICH groups (as in FDD subframe)
var phichTypeList;
var pdcchTypeIndexToPhichTypeIndex = new Array(4);
var phichTypeIndexToPdcchTypeIndexes;
var bw_index;
var cp_index;
var symbolsPerSlot = 7;
var tx_port = 0;
var n_tx_ports = 2;
var nprbs = 6;
var subcarriers = nprbs * 12;
var symbolsPerSlotList = new Array(7, 6);
var nprbsList = new Array(6, 15, 25, 50, 75, 100);
var reg_size = new Array(6, 4, 4, 4);
var n_avail_regs = new Array(4);
var cfi = new Array(3); // For normal, MBSFN, and TDD subframes 1/6;
var n_pdcch_syms = new Array(3); // For normal, MBSFN, and TDD subframes 1/6
var n_pdcch_regs = new Array(4); // index is PDCCH type index
var n_cces = new Array(4); // index is PDCCH type index
var n_invalid_cce_regs = new Array(4); // index is PDCCH type index
var cell_id = 0;
var cell_freq_shift = 0;
var ng_index;
var ng_numerator = new Array(1, 1, 1, 2);
var ng_denominator = new Array(6, 2, 1, 1);
var tddPhichFactor = new Array(
  [2,1,0,0,0,2,1,0,0,0],
  [0,1,0,0,1,0,1,0,0,1],
  [0,0,0,1,0,0,0,0,1,0],
  [1,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,1,0],
  [1,1,0,0,0,1,1,0,0,1]
  );
var phich_dur_index;
var phich_mapping_units = new Array(2); // index is PHICH type index;
var sym_seq = new Array(2);
var first_reg_n_seq = new Array(2);
var unusualSubframeMask;
var mbsfn_subframe;
var valid_mbsfn_subframes = new Array(
  0,
  // FDD
  [1,2,3,6,7,8],
  // TDD
  [3,4,7,8,9]
  );

// Inter column permutation from table 5.1.4-2 in 3GPP TS 36.212 v8.8.0
var inter_column_permutation = new Array(1, 17, 9, 25, 5, 21, 13, 29, 3, 19, 11, 27, 7, 23, 15, 31, 0, 16, 8, 24, 4, 20, 12, 28, 2, 18, 10, 26, 6, 22, 14, 30);

var pcfich_type = 1;
var phich_type = 2;
var pdcch_type = 3;

// phy_regs[PDCCH type index][symbol][REG index]:
//   bits 1:0 = control channel type
//     if bits 1:0 == pcfich_type:
//       bits 3:2 = index into pcfich_regs
//     if bits 1:0 == phich_type:
//       bits 3:2 = REG index into phich_regs
//       bits 8:4 = mapping unit index into phich_regs
//     if bits 1:0 == pdcch_type:
//       bits 11:2 = index into pdcch_phy_regs
// pcfich_regs[REG index]:
//   bits 10:0 = subcarrier
// phich_regs[PHICH type index][REG index][mapping unit index]:
//   bits 1:0 = symbol
//   bits 12:2 = subcarrier
// pdcch_phy_regs[PDCCH type index][REG index]:
//   bits 1:0 = symbol
//   bits 12:2 = subcarrier
//   bits 16:13 = REG index into pdcch_cce_regs
//   bits 23:17 = CCE index into pdcch_cce_regs
// pdcch_cce_regs[PDCCH type index][REG index][CCE index]:
//   bits 9:0 = index into pdcch_phy_regs
var phy_regs = new Array(
      new Array(new Array(200), new Array(300), new Array(300), new Array(18)),
      new Array(new Array(200), new Array(300), new Array(300), new Array(18)),
      new Array(new Array(200), new Array(300), new Array(300), new Array(18)),
      new Array(new Array(200), new Array(300), new Array(300), new Array(18))
      );
var pcfich_regs = new Array(4);
var pcfich_regs_sorted = new Array(4);
var phich_regs = new Array(
      new Array(new Array(25), new Array(25), new Array(25)),
      new Array(new Array(25), new Array(25), new Array(25))
      );
var pdcch_phy_regs = new Array(new Array(787), new Array(787), new Array(787), new Array(787));
var pdcch_cce_regs = new Array(
      new Array(new Array(88), new Array(88), new Array(88),
                new Array(88), new Array(87), new Array(87),
                new Array(87), new Array(87), new Array(87)),
      new Array(new Array(88), new Array(88), new Array(88),
                new Array(88), new Array(87), new Array(87),
                new Array(87), new Array(87), new Array(87)),
      new Array(new Array(88), new Array(88), new Array(88),
                new Array(88), new Array(87), new Array(87),
                new Array(87), new Array(87), new Array(87)),
      new Array(new Array(88), new Array(88), new Array(88),
                new Array(88), new Array(87), new Array(87),
                new Array(87), new Array(87), new Array(87))
      );

// Constants related to grid image
var left_hdr_width = 62;
var first_re_x = 64;
var first_re_y = 65;
var re_width = 6;
var re_height = 6;
var re_pitch_x = 7;
var re_pitch_y = 7;
var slot_shift = 0;
var subframe_shift = 1;
var prb_shift = 0;
var img_height = 149;
var marker_x_ofs = -3;
var marker_y_ofs = -2;
var marker_width = 12;
var marker_6re_height = 45;
var marker_4re_height = 31;
var marker_4re_y_pan = -43;

// Implement Array.prototype.indexOf if not already implemented.
if (!Array.prototype.indexOf)
  {
  Array.prototype.indexOf = function(obj, start)
    {
    for (var i = (start || 0), j = this.length; i < j; i++)
      {
      if (this[i] === obj) return i;
      }
    return -1;
    }
  }

function get_x(subframe, slot, symbol, getRight)
  {
  var x =
    first_re_x
    + ((subframe * 2 + slot) * symbolsPerSlot + symbol) * re_pitch_x
    + subframe * subframe_shift
    + slot * slot_shift
    + (getRight ? re_width : 0);
  return x;
  }

function get_y(subcarrier, getBottom)
  {
  var subc_from_top = 1199 - subcarrier;
  var prb_from_top = Math.floor(subc_from_top / 12);
  var y =
    subc_from_top * re_pitch_y
    + prb_from_top * prb_shift
    + (getBottom ? re_height : 0);
  return y;
  }

function skip_pcfich_subcarriers(subc)
  {
  if (subc >= pcfich_regs_sorted[0]) subc += 6;
  if (subc >= pcfich_regs_sorted[1]) subc += 6;
  if (subc >= pcfich_regs_sorted[2]) subc += 6;
  if (subc >= pcfich_regs_sorted[3]) subc += 6;
  return subc;
  }

function calc_phich_regs(phichTypIndex)
  {
  var sym, first_reg_n, end_reg_n, first_subc, end_subc, n_subc, m, reg_i;
  var hs = "";
  var phichTyp = phichTypeList[phichTypIndex];
  var n_phich_syms = phichTyp & 0x3;
  var pdcchTypeIndexes = phichTypeIndexToPdcchTypeIndexes[phichTypIndex];
  for (var i = 0; i < 3; i++)
    {
    if (n_phich_syms != 2)
      {
      sym = (n_phich_syms == 3) ? i : 0;
      first_reg_n = (Math.floor(cell_id * n_avail_regs[sym]/n_avail_regs[0]) + Math.floor(i * n_avail_regs[sym]/3)) % n_avail_regs[sym];
      end_reg_n = Math.min(first_reg_n + phich_mapping_units[phichTypIndex], n_avail_regs[sym]);
      first_subc = reg_size[sym] * first_reg_n;
      end_subc = reg_size[sym] * end_reg_n;
      if (sym == 0)
        {
        first_subc = skip_pcfich_subcarriers(first_subc);
        end_subc = skip_pcfich_subcarriers(end_subc);
        }
      n_subc = end_subc - first_subc;
      m = 0;
      reg_i = first_subc / reg_size[sym];
      for (var subc = first_subc; subc < end_subc; subc += reg_size[sym])
        {
        if ((phy_regs[0][sym][reg_i] & 0x3) != pcfich_type)
          {
          phich_regs[phichTypIndex][i][m] = sym + (subc << 2);
          for (var j = 0; j < pdcchTypeIndexes.length; j++)
            {
            var pdcchTypIndex = pdcchTypeIndexes[j];
            phy_regs[pdcchTypIndex][sym][reg_i] = phich_type + (i << 2) + (m << 4);
            }
          m++
          }
        reg_i++;
        }
      for (var subf = 0; subf < 10; subf++)
        {
        var pdcchTypIdx = subfPdcchTypeIndexes[subf];
        if (pdcchTypIdx < 0) continue;
        var pdcchTyp = pdcchTypeList[pdcchTypIdx];
        if (pdcchTyp > 3)
          {
          var subfPhichTyp = phichTypeList[pdcchTypeIndexToPhichTypeIndex[pdcchTypIdx]];
          if (subfPhichTyp == phichTyp)
            {
            hs += make_transmission(colorPHICH, first_subc, subf, 0, sym, n_subc, 1);
            }
          }
        }
      if (end_reg_n - first_reg_n < phich_mapping_units[phichTypIndex])
        {
        first_subc = 0;
        end_reg_n = phich_mapping_units[phichTypIndex] - (end_reg_n - first_reg_n);
        end_subc = reg_size[sym] * end_reg_n;
        if (sym == 0)
          {
          first_subc = skip_pcfich_subcarriers(first_subc);
          end_subc = skip_pcfich_subcarriers(end_subc);
          }
        n_subc = end_subc - first_subc;
        reg_i = first_subc / reg_size[sym];
        for (var subc = first_subc; subc < end_subc; subc += reg_size[sym])
          {
          if ((phy_regs[0][sym][reg_i] & 0x3) != pcfich_type)
            {
            phich_regs[phichTypIndex][i][m] = sym + (subc << 2);
            for (var j = 0; j < pdcchTypeIndexes.length; j++)
              {
              var pdcchTypIndex = pdcchTypeIndexes[j];
              phy_regs[pdcchTypIndex][sym][reg_i] = phich_type + (i << 2) + (m << 4);
              }
            m++
            }
          reg_i++;
          }
        for (var subf = 0; subf < 10; subf++)
          {
          var pdcchTypIdx = subfPdcchTypeIndexes[subf];
          if (pdcchTypIdx < 0) continue;
          var pdcchTyp = pdcchTypeList[pdcchTypIdx];
          if (pdcchTyp > 3)
            {
            var subfPhichTyp = phichTypeList[pdcchTypeIndexToPhichTypeIndex[pdcchTypIdx]];
            if (subfPhichTyp == phichTyp)
              {
              hs += make_transmission(colorPHICH, first_subc, subf, 0, sym, n_subc, 1);
              }
            }
          }
        }
      }
    else // n_phich_syms == 2
      {
      sym_seq[0] = (i + 1) % 2;
      sym_seq[1] = 1 - sym_seq[0];
      first_reg_n_seq[0] = (Math.floor(cell_id * n_avail_regs[sym_seq[0]]/n_avail_regs[1]) + Math.floor(i * n_avail_regs[sym_seq[0]]/3))
                           % n_avail_regs[sym_seq[0]];
      first_reg_n_seq[1] = (Math.floor(cell_id * n_avail_regs[sym_seq[1]]/n_avail_regs[1]) + 2 + Math.floor(i * n_avail_regs[sym_seq[1]]/3))
                           % n_avail_regs[sym_seq[1]];
      var remaining_units = phich_mapping_units[phichTypIndex];
      var sym_i = 0;
      m = 0;
      while (remaining_units > 0)
        {
        sym = sym_seq[sym_i];
        first_reg_n = first_reg_n_seq[sym_i];
        var reg_size_sym = reg_size[sym];
        var units = Math.min(remaining_units, 2, n_avail_regs[sym] - first_reg_n);
        first_subc = reg_size_sym * first_reg_n;
        end_subc = first_subc + reg_size_sym * units;
        if (sym == 0)
          {
          first_subc = skip_pcfich_subcarriers(first_subc);
          end_subc = skip_pcfich_subcarriers(end_subc);
          }
        n_subc = end_subc - first_subc;
        reg_i = first_subc / reg_size_sym;
        for (var subc = first_subc; subc < end_subc; subc += reg_size_sym)
          {
          if ((phy_regs[0][sym][reg_i] & 0x3) != pcfich_type)
            {
            phich_regs[phichTypIndex][i][m] = sym + (subc << 2);
            for (var j = 0; j < pdcchTypeIndexes.length; j++)
              {
              var pdcchTypIndex = pdcchTypeIndexes[j];
              phy_regs[pdcchTypIndex][sym][reg_i] = phich_type + (i << 2) + (m << 4);
              }
            m++
            }
          reg_i++;
          }
        for (var subf = 0; subf < 10; subf++)
          {
          var pdcchTypIdx = subfPdcchTypeIndexes[subf];
          if (pdcchTypIdx < 0) continue;
          var pdcchTyp = pdcchTypeList[pdcchTypIdx];
          if (pdcchTyp > 3)
            {
            var subfPhichTyp = phichTypeList[pdcchTypeIndexToPhichTypeIndex[pdcchTypIdx]];
            if (subfPhichTyp == phichTyp)
              {
              hs += make_transmission(colorPHICH, first_subc, subf, 0, sym, n_subc, 1);
              }
            }
          }
        first_reg_n += 4;
        remaining_units -= units;
        if (first_reg_n >= n_avail_regs[sym])
          {
          first_reg_n -= n_avail_regs[sym];
          if (first_reg_n == 3 && remaining_units > 0)
            {
            first_subc = 0;
            n_subc = reg_size_sym;
            reg_i = 0;
            if ((phy_regs[0][sym][reg_i] & 0x3) == pcfich_type)
              {
              first_subc = reg_size_sym;
              reg_i = 1;
              }
            phich_regs[phichTypIndex][i][m] = sym + (first_subc << 2);
            for (var j = 0; j < pdcchTypeIndexes.length; j++)
              {
              var pdcchTypIndex = pdcchTypeIndexes[j];
              phy_regs[pdcchTypIndex][sym][reg_i] = phich_type + (i << 2) + (m << 4);
              }
            m++
            for (var subf = 0; subf < 10; subf++)
              {
              var pdcchTypIdx = subfPdcchTypeIndexes[subf];
              if (pdcchTypIdx < 0) continue;
              var pdcchTyp = pdcchTypeList[pdcchTypIdx];
              if (pdcchTyp > 3)
                {
                var subfPhichTyp = phichTypeList[pdcchTypeIndexToPhichTypeIndex[pdcchTypIdx]];
                if (subfPhichTyp == phichTyp)
                  {
                  hs += make_transmission(colorPHICH, first_subc, subf, 0, sym, n_subc, 1);
                  }
                }
              }
            }
          }
        first_reg_n_seq[sym_i] = first_reg_n;
        sym_i = 1 - sym_i;
        }
      }
    }

  return hs;
  }

function calc_pdcch_regs(phy_regs, pdcch_phy_regs, pdcch_cce_regs, n_pdcch_syms)
  {
  // Calc and fill pdcch_phy_regs and update phy_regs

  var pdcch_phy_reg_i = 0;
  var reg_i = new Array(0, 0);
  var reg_rest = new Array(0, 0);
  var subc = 0;
  var subc_step;

  for (var i = 0; i < nprbs * 4; i++)
    {
    for (var sym = 0; sym < n_pdcch_syms; sym++)
      {
      var reg_size_type = +(reg_size[sym] == 6);
      if (reg_rest[reg_size_type] == 0 && phy_regs[sym][reg_i[reg_size_type]] == 0)
        {
        pdcch_phy_regs[pdcch_phy_reg_i] = sym + (subc << 2);
        phy_regs[sym][reg_i[reg_size_type]] = pdcch_type + (pdcch_phy_reg_i << 2);
        pdcch_phy_reg_i++;
        }
      }

    if (reg_rest[0] == 0)
      {
      reg_i[0]++;
      reg_rest[0] = 4;
      }
    if (reg_rest[1] == 0)
      {
      reg_i[1]++;
      reg_rest[1] = 6;
      }
    subc_step = (reg_rest[0] < reg_rest[1]) ? reg_rest[0] : reg_rest[1];
    subc += subc_step;
    reg_rest[0] -= subc_step;
    reg_rest[1] -= subc_step;
    }

  // Calc and fill pdcch_cce_regs and update pdcch_phy_regs

  var nregs = pdcch_phy_reg_i;
  var nrows = (nregs + 31) >> 5;
  var ndummies = (nrows << 5) - nregs;
  var pdcch_cce_reg_i;
  var cce_i;

  pdcch_phy_reg_i = cell_id % nregs;
  if (pdcch_phy_reg_i != 0) pdcch_phy_reg_i = nregs - pdcch_phy_reg_i;

  for (var col_i = 0; col_i < 32; col_i++)
    {
    var col_reg_offset = inter_column_permutation[col_i] - ndummies;
    for (var row_i = (col_reg_offset < 0); row_i < nrows; row_i++)
      {
      pdcch_cce_reg_i = col_reg_offset + (row_i << 5);
      cce_i = Math.floor(pdcch_cce_reg_i / 9);
      pdcch_cce_reg_i = pdcch_cce_reg_i - cce_i * 9;
      pdcch_cce_regs[pdcch_cce_reg_i][cce_i] = pdcch_phy_reg_i;
      pdcch_phy_regs[pdcch_phy_reg_i] += (pdcch_cce_reg_i << 13) + (cce_i << 17);
      pdcch_phy_reg_i++;
      if (pdcch_phy_reg_i >= nregs) pdcch_phy_reg_i = 0;
      }
    }
  }

function update_link()
  {
  var j = 0;
  for (var i = 0; i < link_param_list.length; i++)
    {
    var name = link_param_list[i];
    if (typeof(name) == "object")
      {
      if (document.frm[name[1]].value != name[2]) continue;
      name = name[0];
      }
    link_args[j++] = name + "=" + document.frm[name].value;
    }
  link_args.length = j;
  var url = location.href.split("?")[0];
  resetLinkElem.href = url;
  url += "?" + link_args.join("&");
  directLinkElem.href = url;

  var subf = 1 * document.frm["mrkr_subf"].value;
  url = "lte_pdsch_calc.html" +
    "?duplex_mode=" + document.frm["duplex_mode"].value +
    "&tdd_ul_dl_cfg=" + document.frm["tdd_ul_dl_cfg"].value +
    "&tdd_spec_subf_cfg=" + document.frm["tdd_spec_subf_cfg"].value +
    "&bw=" + document.frm["bw"].value +
    "&cp=" + document.frm["cp"].value +
    "&n_tx_ports=" + document.frm["n_tx_ports"].value +
    "&cfi=" + cfi[pdcchTypeList[subfPdcchTypeIndexes[subf]] & 0x3] +
    "&subframe=" + subf +
    "&modulation=64qam" +
    "&prb_alloc_slot0=all";
  calcPdschLinkElem.href = url;
  }

function set_marker(subcarrier, subframe, symbol)
  {
  var x, y, w, h, pan;
  var reg_sz = reg_size[symbol];
  var subc_from_top = subcarriers - subcarrier - reg_sz;
  var prb_from_top = Math.floor(subc_from_top / 12);
  x = get_x(subframe, 0, symbol, false) + marker_x_ofs;
  y = first_re_y
    + subc_from_top * re_pitch_y
    + prb_from_top * prb_shift
    + marker_y_ofs;
  w = marker_width;
  if (reg_sz == 6)
    {
    h = marker_6re_height;
    pan = 0;
    }
  else
    {
    h = marker_4re_height;
    pan = marker_4re_y_pan;
    }
  markerElem.style.left = x + "px";
  markerElem.style.top = y + "px";
  markerClipElem.style.width = w + "px";
  markerClipElem.style.height = h + "px";
  markerPanElem.style.top = pan + "px";
  markerElem.style.display = "block";
  }

function clear_marker()
  {
  markerElem.style.display = "none";
  }

function update_marker()
  {
  var reg_i, ph_reg_i, m_unit, cce_i, sym, subc, cce_max, reg_max, reg_options,
      has_invalid_cce;
  var mtype = document.frm.marker_type.selectedIndex;
  var subf = document.frm.mrkr_subf.selectedIndex;
  var pdcchTypIdx;
  var first_enabled_i = 9;

  for (var i = 0; i < 10; i++)
    {
    pdcchTypIdx = subfPdcchTypeIndexes[i];
    var disabled = (pdcchTypIdx < 0 || mtype == 2 && pdcchTypeList[pdcchTypIdx] < 4);
    document.frm.mrkr_subf.options[i].disabled = disabled;
    if (disabled && subf == i)
      {
      subf = -1;
      }
    else if (i < first_enabled_i)
      {
      first_enabled_i = i;
      }
    }
  if (subf < 0)
    {
    document.frm.mrkr_subf.selectedIndex = subf = first_enabled_i;
    }

  pdcchTypIdx = subfPdcchTypeIndexes[subf];

  if (mtype > 0)
    {
    if (isMSIE7)
      markerExtraRowElem.style.display = "block";
    else
      markerExtraRowElem.style.display = "table-row";
    }

  switch (mtype)
    {
    case 0: // No marker
      markerExtraRowElem.style.display = "none";
      markerPcfichElem.style.display = "none";
      markerPhichElem.style.display = "none";
      markerPdcchElem.style.display = "none";
      markerNoteElem.innerHTML = "";
      clear_marker();
      break;
    case 1: // PCFICH marker
      markerPcfichElem.style.display = "inline";
      markerPhichElem.style.display = "none";
      markerPdcchElem.style.display = "none";
      reg_i = document.frm.mrkr_pcfich_reg.selectedIndex;
      set_marker(pcfich_regs[reg_i], subf, 0);
      markerNoteElem.innerHTML = "";
      break;
    case 2: // PHICH marker
      markerPcfichElem.style.display = "none";
      markerPhichElem.style.display = "inline";
      markerPdcchElem.style.display = "none";
      reg_i = document.frm.mrkr_phich_reg.selectedIndex;
      var phichTypIndex = pdcchTypeIndexToPhichTypeIndex[pdcchTypIdx];
      for (var i = document.frm.mrkr_phich_map_unit.options.length; i < phich_mapping_units[phichTypIndex]; i++)
        {
        document.frm.mrkr_phich_map_unit.options[i] = new Option(i,i);
        }
      document.frm.mrkr_phich_map_unit.options.length = phich_mapping_units[phichTypIndex];
      m_unit = document.frm.mrkr_phich_map_unit.selectedIndex;
      if (m_unit >= phich_mapping_units[phichTypIndex])
        {
        document.frm.mrkr_phich_map_unit.selectedIndex = m_unit = phich_mapping_units[phichTypIndex] - 1;
        }
      subc = phich_regs[phichTypIndex][reg_i][m_unit];
      sym = subc & 0x3;
      subc >>= 2;
      set_marker(subc, subf, sym);
      markerNoteElem.innerHTML = "";
      break;
    case 3: // PDCCH marker
      {
      markerPcfichElem.style.display = "none";
      markerPhichElem.style.display = "none";
      markerPdcchElem.style.display = "inline";
      var pdcch_mtype = document.frm.mrkr_pdcch_reg_type.selectedIndex;
      if (pdcch_mtype == 0)
        { // logical cce/reg index
        markerPdcchLogicalElem.style.display = "inline";
        markerPdcchPhysicalElem.style.display = "none";
        reg_i = document.frm.mrkr_pdcch_cce_reg.selectedIndex;
        cce_i = Math.round(1 * document.frm.mrkr_pdcch_cce.value);
        if (isNaN(cce_i) || cce_i < 0) cce_i = 0;
        reg_max = 8;
        has_invalid_cce = (n_invalid_cce_regs[pdcchTypIdx] != 0);
        cce_max = n_cces[pdcchTypIdx] - !has_invalid_cce;
        if (cce_i > cce_max) cce_i = cce_max;
        if (cce_i >= n_cces[pdcchTypIdx])
          {
          reg_max = n_invalid_cce_regs[pdcchTypIdx] - 1;
          if (reg_i > reg_max) reg_i = reg_max;
          }
        ph_reg_i = pdcch_cce_regs[pdcchTypIdx][reg_i][cce_i];
        subc = pdcch_phy_regs[pdcchTypIdx][ph_reg_i];
        markerCceRangeElem.innerHTML = "(0-" + (has_invalid_cce ? ((cce_max-1) + ", invalid " + cce_max) : cce_max) + ")";
        reg_options = document.frm.mrkr_pdcch_cce_reg.options;
        for (var i = 0; i < reg_options.length; i++)
          {
          if (i <= reg_max)
            {
            reg_options[i].disabled = false;
            }
          else
            {
            reg_options[i].disabled = true;
            }
          }
        markerNoteElem.innerHTML = "(Physical REG " + ph_reg_i + ")";
        }
      else
        { // physical reg index
        markerPdcchLogicalElem.style.display = "none";
        markerPdcchPhysicalElem.style.display = "inline";
        ph_reg_i = Math.round(1 * document.frm.mrkr_pdcch_phy_reg.value);
        if (isNaN(ph_reg_i) || ph_reg_i < 0) ph_reg_i = 0;
        reg_max = n_pdcch_regs[pdcchTypIdx] - 1;
        if (ph_reg_i > reg_max) ph_reg_i = reg_max;
        subc = pdcch_phy_regs[pdcchTypIdx][ph_reg_i];
        cce_max = n_cces[pdcchTypIdx] - 1;
        markerPhyRegRangeElem.innerHTML = "(0-" + reg_max + ")";
        reg_i = (subc >> 13) & 0xf;
        cce_i = (subc >> 17) & 0x7f;
        markerNoteElem.innerHTML = "(Logical REG " + reg_i + " of " +
          (cce_i > cce_max ? "invalid " : "") +
          "CCE " + cce_i + ")";
        }
      document.frm.mrkr_pdcch_phy_reg.value = ph_reg_i;
      document.frm.mrkr_pdcch_cce_reg.selectedIndex = reg_i;
      document.frm.mrkr_pdcch_cce.value = cce_i;
      sym = subc & 0x3;
      subc = (subc >> 2) & 0x7ff;
      set_marker(subc, subf, sym);
      break;
      }
    }

  update_link();
  }

function create_RS_transmission()
  {
  var id;
  var hs = "";
  var w = 2 * re_pitch_x;
  var h = 72 * re_pitch_y;
  var pan_x = -3 * re_pitch_x;
  hs += '<div id="RS_inact_PBCH_0" class="img_clip" style="position:absolute;width:' + w + 'px;height:' + h + 'px"><div id="RS_inact_PBCH_0_pan" class="img_pan" style="left:' + pan_x + 'px"><img src="' + inactiveRSFile + '" alt=""><\/div><\/div>';
  w = re_pitch_x;
  hs += '<div id="RS_inact_PBCH_1" class="img_clip" style="position:absolute;width:' + w + 'px;height:' + h + 'px"><div id="RS_inact_PBCH_1_pan" class="img_pan" style="left:0px"><img src="' + inactiveRSFile + '" alt=""><\/div><\/div>';

  var y = 0;
  h = 1200 * re_pitch_y;
  for (var sf = 0; sf < 10; sf++)
    {
    for (var slt = 0; slt < 2; slt++)
      {
      id = sf + "_" + slt;
      hs += '<div id="RS_inact_' + id + '" class="img_clip" style="position:absolute;top:' + y + 'px;height:' + h + 'px"><div id="RS_inact_' + id + '_pan" class="img_pan"><img src="' + inactiveRSFile + '" alt=""><\/div><\/div>';
      hs += '<div id="RS_act_' + id + '" class="img_clip" style="position:absolute;top:' + y + 'px;height:' + h + 'px"><div id="RS_act_' + id + '_pan" class="img_pan"><img src="' + activeRSFile + '" alt=""><\/div><\/div>';
      }
    }
  var x = first_re_x;
  id = "1st";
  hs += '<div id="RS_inact_' + id + '" class="img_clip" style="position:absolute;left:' + x + 'px;top:' + y + 'px;height:' + h + 'px"><div id="RS_inact_' + id + '_pan" class="img_pan" style="left:' + pan_x + 'px"><img src="' + inactiveRSFile + '" alt=""><\/div><\/div>';
  hs += '<div id="RS_act_' + id + '" class="img_clip" style="position:absolute;left:' + x + 'px;top:' + y + 'px;height:' + h + 'px"><div id="RS_act_' + id + '_pan" class="img_pan"><img src="' + activeRSFile + '" alt=""><\/div><\/div>';
  return hs;
  }

function update_RS_transmission()
  {
  var x, y, w, h, pan_x, pan_y, pan_xa;
  var x1, y1, w1, h1, pan_x1;
  var elem_style, elem_pan_style;
  y = 0;
  w = (n_tx_ports == 4 ? 5 : 4) * re_pitch_x;
  h = 1200 * re_pitch_y;
  pan_x = 0;
  pan_y = -cell_freq_shift * re_pitch_y;
  pan_xa = pan_x;
  var pan_ya = new Array(pan_y, pan_y);
  var pan_ya0 = -((cell_freq_shift + 3) % 6) * re_pitch_y;
  if (tx_port > 1)
    pan_xa += 4 * re_pitch_x;
  if (tx_port == 1 || tx_port == 3)
    pan_ya[0] = pan_ya0;
  if (tx_port == 1 || tx_port == 2)
    pan_ya[1] = pan_ya0;
  if (n_tx_ports < 4)
    {
    // RS elements for all 4 ports are unavailable for PBCH
    h1 = 72 * re_pitch_y;
    y1 = y + h - (subcarriers * re_pitch_y + h1)/2;
    x = get_x(0, 0, symbolsPerSlot == 7 ? 4 : 3, false);
    x1 = x + 3 * re_pitch_x;
    RSInactivePBCH0Elem.style.left = x1 + "px";
    RSInactivePBCH0Elem.style.top = y1 + "px";
    RSInactivePBCH0PanElem.style.top = pan_y + "px";
    if (n_tx_ports == 1 && symbolsPerSlot == 6)
      {
      x = get_x(0, 1, 3, false);
      RSInactivePBCH1Elem.style.left = x + "px";
      RSInactivePBCH1Elem.style.top = y1 + "px";
      RSInactivePBCH1PanElem.style.top = pan_y + "px";
      RSInactivePBCH1Elem.style.visibility = "visible";
      }
    else
      {
      RSInactivePBCH1Elem.style.visibility = "hidden";
      }
    }
  for (var sf = 0; sf < 10; sf++)
    {
    for (var slt = 0; slt < 2; slt++)
      {
      if (sf == 9 && slt == 1)
        {
        w = re_pitch_x;
        }
      x = get_x(sf, slt, symbolsPerSlot == 7 ? 4 : 3, false);
      elem_style = RSInactiveElem[sf][slt].style;
      elem_pan_style = RSInactivePanElem[sf][slt].style;
      elem_style.left = x + "px";
      elem_pan_style.top = pan_y + "px";
      if (n_tx_ports > 1)
        {
        elem_style.width = w + "px";
        elem_style.visibility = "visible";
        elem_pan_style.left = pan_x + "px";
        }
      else if (slt == 0 && symbolsPerSlot == 6 && subfPdcchTypeIndexes[sf] >= 0 &&
        n_pdcch_syms[pdcchTypeList[subfPdcchTypeIndexes[sf]] & 0x3] == 4)
        {
        // RS elements for 2 ports are unavailable for control channels for the 1-port case
        w1 = re_pitch_x;
        elem_style.width = w1 + "px";
        elem_style.visibility = "visible";
        elem_pan_style.left = pan_x + "px";
        }
      else if (slt == 1)
        {
        // RS elements for 2 ports are unavailable for control channels for the 1-port case
        pan_x1 = 3 * re_pitch_x;
        elem_style.width = w + "px";
        elem_style.visibility = "visible";
        elem_pan_style.left = pan_x1 + "px";
        }
      else
        {
        elem_style.visibility = "hidden";
        }
      elem_style = RSActiveElem[sf][slt].style;
      elem_pan_style = RSActivePanElem[sf][slt].style;
      elem_style.left = x + "px";
      elem_style.width = w + "px";
      elem_pan_style.left = pan_xa + "px";
      elem_pan_style.top = pan_ya[slt] + "px";
      }
    }
  x = first_re_x;
  w = (n_tx_ports == 4 ? 2 : 1) * re_pitch_x;
  pan_x -= 3 * re_pitch_x;
  pan_xa -= 3 * re_pitch_x;
  elem_style = RS1stInactiveElem.style;
  elem_pan_style = RS1stInactivePanElem.style;
  elem_style.width = w + "px";
  elem_pan_style.top = pan_y + "px";
  elem_style = RS1stActiveElem.style;
  elem_pan_style = RS1stActivePanElem.style;
  elem_style.width = w + "px";
  elem_pan_style.left = pan_xa + "px";
  elem_pan_style.top = pan_ya[1] + "px";
  }

function make_transmission(color, subcarrier, subframe, slot, symbol, nsubcarriers, nsymbols, subc_grp_pitch, n_subc_grps, subf_grp_pitch, n_subf_grps, slot_grp_pitch, n_slot_grps, sym_grp_pitch, n_sym_grps)
  {
  if (typeof subc_grp_pitch == "undefined") subc_grp_pitch = 1;
  if (typeof n_subc_grps == "undefined") n_subc_grps = 1;
  if (typeof subf_grp_pitch == "undefined") subf_grp_pitch = 1;
  if (typeof n_subf_grps == "undefined") n_subf_grps = 1;
  if (typeof slot_grp_pitch == "undefined") slot_grp_pitch = 1;
  if (typeof n_slot_grps == "undefined") n_slot_grps = 1;
  if (typeof sym_grp_pitch == "undefined") sym_grp_pitch = 1;
  if (typeof n_sym_grps == "undefined") n_sym_grps = 1;
  var x, y, w, h;
  var hs = "";
  for (var subc = subcarrier; subc < subcarrier + subc_grp_pitch * n_subc_grps; subc += subc_grp_pitch)
    {
    for (var subf = subframe; subf < subframe + subf_grp_pitch * n_subf_grps; subf += subf_grp_pitch)
      {
      for (var slt = slot; slt < slot + slot_grp_pitch * n_slot_grps; slt += slot_grp_pitch)
        {
        for (var sym = symbol; sym < symbol + sym_grp_pitch * n_sym_grps; sym += sym_grp_pitch)
          {
          x = get_x(subf, slt, sym, false);
          y = get_y(subc + nsubcarriers - 1, false);
          w = get_x(subf, slt, sym + nsymbols - 1, true) - x;
          h = get_y(subc, true) - y;
          hs += '<div class="transmission" style="left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;background-color:' + color + ';"><\/div>';
          }
        }
      }
    }
  return hs;
  }

function create_transmissions()
  {
  var hs = "";
  hs += create_RS_transmission();

  transmissionElem.innerHTML = hs;

  RS1stInactiveElem = document.getElementById("RS_inact_1st");
  RS1stInactivePanElem = document.getElementById("RS_inact_1st_pan");
  RS1stActiveElem = document.getElementById("RS_act_1st");
  RS1stActivePanElem = document.getElementById("RS_act_1st_pan");
  for (var sf = 0; sf < 10; sf++)
    {
    RSInactiveElem[sf] = new Array(2);
    RSInactivePanElem[sf] = new Array(2);
    RSActiveElem[sf] = new Array(2);
    RSActivePanElem[sf] = new Array(2);
    for (var slt = 0; slt < 2; slt++)
      {
      RSInactiveElem[sf][slt] = document.getElementById("RS_inact_" + sf + "_" + slt);
      RSInactivePanElem[sf][slt] = document.getElementById("RS_inact_" + sf + "_" + slt + "_pan");
      RSActiveElem[sf][slt] = document.getElementById("RS_act_" + sf + "_" + slt);
      RSActivePanElem[sf][slt] = document.getElementById("RS_act_" + sf + "_" + slt + "_pan");
      }
    }
  RSInactivePBCH0Elem = document.getElementById("RS_inact_PBCH_0");
  RSInactivePBCH0PanElem = document.getElementById("RS_inact_PBCH_0_pan");
  RSInactivePBCH1Elem = document.getElementById("RS_inact_PBCH_1");
  RSInactivePBCH1PanElem = document.getElementById("RS_inact_PBCH_1_pan");
  }

function update_transmissions()
  {
  var hs = "";
  unusualSubframeMask = 0;
  var unusualSubframeList = new Array();
  if (frameStructType == 1)
    {
    tddUlDlCfgRowElem.style.display = "none";
    tddSpecSubfCfgRowElem.style.display = "none";
    cfiTddSpecSubfRowElem.style.display = "none";
    ulElem.innerHTML = "";
    }
  else
    {
    if (isMSIE7)
      {
      tddUlDlCfgRowElem.style.display = "block";
      tddSpecSubfCfgRowElem.style.display = "block";
      cfiTddSpecSubfRowElem.style.display = "block";
      }
    else
      {
      tddUlDlCfgRowElem.style.display = "table-row";
      tddSpecSubfCfgRowElem.style.display = "table-row";
      cfiTddSpecSubfRowElem.style.display = "table-row";
      }
    tddUlDlCfg = document.frm.tdd_ul_dl_cfg.selectedIndex;
    tddSpecSubfCfg = document.frm.tdd_spec_subf_cfg.selectedIndex;
    if (symbolsPerSlot == 7)
      {
      document.frm.tdd_spec_subf_cfg.options[7].disabled = false;
      document.frm.tdd_spec_subf_cfg.options[8].disabled = false;
      }
    else
      {
      document.frm.tdd_spec_subf_cfg.options[7].disabled = true;
      document.frm.tdd_spec_subf_cfg.options[8].disabled = true;
      if (tddSpecSubfCfg > 6)
        {
        tddSpecSubfCfg == 6;
        document.frm.tdd_spec_subf_cfg.selectedIndex = 6;
        }
      }
    tddUlDlCfgCommentElem.innerHTML = '(' + tddUlDlCfgDescriptions[tddUlDlCfg] + ')';
    var dwPtsSyms = tddSpecSubfDlSyms[symbolsPerSlot - 6][tddSpecSubfCfg];
    var upPtsSyms = tddSpecSubfUlSyms[symbolsPerSlot - 6][tddSpecSubfCfg];
    tddSpecSubfCfgCommentElem.innerHTML = '(' + dwPtsSyms + ' DwPTS symbols, '
      + upPtsSyms + ' UpPTS symbol' + ((upPtsSyms == 1) ? '' : 's') + ')<br><span class="note">'
      + ((dwPtsSyms <= 3) ? '(Note: No PDSCH allowed in DwPTS of this duration)' : '&nbsp;') + '<\/span>';
    var hs2 = "";
    for (var i = 0; i < 10; i++)
      {
      if (tddUlDlCfgs[tddUlDlCfg][i] == "U")
        {
        hs2 += make_transmission(colorUL, 0, i, 0, 0, subcarriers, symbolsPerSlot * 2);
        }
      else if (tddUlDlCfgs[tddUlDlCfg][i] == "S")
        {
        hs2 += make_transmission(colorUL, 0, i, 0, symbolsPerSlot * 2 - upPtsSyms, subcarriers, upPtsSyms);
        hs2 += make_transmission(colorGP, 0, i, 0, dwPtsSyms, subcarriers, symbolsPerSlot * 2 - dwPtsSyms - upPtsSyms);
        if (dwPtsSyms <= 3)
          {
          // No PDSCH allowed
          hs += make_transmission(colorUnused, 0, i, 0, 0, subcarriers, dwPtsSyms);
          }
        }
      }
    ulElem.innerHTML = hs2;
    unusualSubframeMask |= 0x42; // Bits 1 and 6 set
    unusualSubframeList.push(1,6);
    }

  mbsfn_subframe = document.frm.mbsfn_subf.value;
  var mbsfn_subframe_index = 0;
  document.frm.mbsfn_subf.options.length = 1;
  var j = 1;
  for (var i = 0; i < valid_mbsfn_subframes[frameStructType].length; i++)
    {
    var subf = valid_mbsfn_subframes[frameStructType][i];
    if (frameStructType == 1 || tddUlDlCfgs[tddUlDlCfg][subf] == "D")
      {
      if (mbsfn_subframe == subf) mbsfn_subframe_index = j;
      document.frm.mbsfn_subf.options[j++] = new Option(subf,subf);
      }
    }
  document.frm.mbsfn_subf.selectedIndex = mbsfn_subframe_index;
  var mbsfn_enabled = (mbsfn_subframe_index > 0);
  if (mbsfn_enabled)
    {
    if (isMSIE7)
      {
      cfiMbsfnRowElem.style.display = "block";
      }
    else
      {
      cfiMbsfnRowElem.style.display = "table-row";
      }
    mbsfn_subframe *= 1;
    unusualSubframeMask |= 1 << mbsfn_subframe;
    unusualSubframeList.push(mbsfn_subframe);
    }
  else
    {
    cfiMbsfnRowElem.style.display = "none";
    mbsfn_subframe = 10;
    }
  unusualSubframeList = unusualSubframeList.sort();
  var unusualSubframeString = "subframe" + ((unusualSubframeList.length == 1) ? " " : "s ") + unusualSubframeList.join(",");

  phich_dur_index = document.frm.phich_dur.selectedIndex;

  // Determine PDCCH and PHICH types for all subframes
  if (frameStructType == 1)
    {
    pdcchTypeList = [4];
    phichTypeList = [phich_dur_index ? 7 : 5];
    for (var i = 0; i < 10; i++)
      {
      subfPdcchTypeIndexes[i] = 0;
      }
    pdcchTypeIndexToPhichTypeIndex[0] = 0;
    if (mbsfn_enabled)
      {
      pdcchTypeList[1] = 5;
      subfPdcchTypeIndexes[mbsfn_subframe] = 1;
      if (phich_dur_index == 1)
        {
        phichTypeList[1] = 6;
        pdcchTypeIndexToPhichTypeIndex[1] = 1;
        }
      else
        {
        pdcchTypeIndexToPhichTypeIndex[1] = 0;
        }
      }
    }
  else // frameStructType == 2
    {
    pdcchTypeList = [];
    phichTypeList = [];
    for (var i = 0; i < 10; i++)
      {
      if (tddUlDlCfgs[tddUlDlCfg][i] == "U")
        {
        subfPdcchTypeIndexes[i] = -1; // Invalid index used for uplink subframe
        continue;
        }

      var typ = tddPhichFactor[tddUlDlCfg][i] << 2;
      if (i == mbsfn_subframe) typ |= 0x1;
      if (i == 1 || i == 6) typ |= 0x2;

      var typIndex = pdcchTypeList.indexOf(typ);
      if (typIndex < 0)
        {
        typIndex = pdcchTypeList.length;
        pdcchTypeList[typIndex] = typ;
        }
      subfPdcchTypeIndexes[i] = typIndex;

      if (typ < 4) continue; // No PHICH type for PHICH factor 0

      if (phich_dur_index == 0)
        {
        typ = typ & 0xC | 0x1;
        }
      else
        {
        typ = typ & 0xC | ((typ & 0x3) ? 0x2 : 0x3);
        }
      var phichTypIndex = phichTypeList.indexOf(typ);
      if (phichTypIndex < 0)
        {
        phichTypIndex = phichTypeList.length;
        phichTypeList[phichTypIndex] = typ;
        }
      pdcchTypeIndexToPhichTypeIndex[typIndex] = phichTypIndex;
      }
    }

  var n_phich_syms = (phich_dur_index == 0) ? 1 : 3;
  var n_phich_syms_mbsfn = (phich_dur_index == 0) ? 1 : 2;

  n_tx_ports = document.frm.n_tx_ports.selectedIndex + 1;
  if (n_tx_ports == 3) n_tx_ports = 4;

  var cfi_min = n_phich_syms - (nprbs <= 10);
  var cfi_max = 3;
  cfi[0] = document.frm.cfi.selectedIndex + 1;
  if (cfi[0] < cfi_min)
    {
    cfi[0] = cfi_min;
    document.frm.cfi.selectedIndex = cfi[0] - 1;
    }
  var cfi_options = document.frm.cfi.options;
  for (var i = 0; i < cfi_options.length; i++)
    {
    cfi_options[i].disabled = (i + 1 < cfi_min)
    }
  n_pdcch_syms[0] = cfi[0] + +(nprbs <= 10);

  if (mbsfn_enabled)
    {
    cfi_min = (n_tx_ports == 4 ? 2 : n_phich_syms_mbsfn) - (nprbs <= 10);
    cfi_max = 2 - (nprbs <= 10);
    cfi[1] = document.frm.mbsfn_cfi.selectedIndex + 1;
    if (cfi[1] < cfi_min)
      {
      cfi[1] = cfi_min;
      document.frm.mbsfn_cfi.selectedIndex = cfi[1] - 1;
      }
    if (cfi[1] > cfi_max)
      {
      cfi[1] = cfi_max;
      document.frm.mbsfn_cfi.selectedIndex = cfi[1] - 1;
      }
    var cfi_options = document.frm.mbsfn_cfi.options;
    for (var i = 0; i < cfi_options.length; i++)
      {
      cfi_options[i].disabled = (i + 1 < cfi_min || i + 1 > cfi_max);
      }
    n_pdcch_syms[1] = cfi[1] + +(nprbs <= 10);
    }

  if (frameStructType == 2)
    {
    cfi_min = n_phich_syms_mbsfn - (nprbs <= 10);
    cfi_max = 2 - (nprbs <= 10);
    cfi[2] = document.frm.tdd_spec_subf_cfi.selectedIndex + 1;
    if (cfi[2] < cfi_min)
      {
      cfi[2] = cfi_min;
      document.frm.tdd_spec_subf_cfi.selectedIndex = cfi[2] - 1;
      }
    if (cfi[2] > cfi_max)
      {
      cfi[2] = cfi_max;
      document.frm.tdd_spec_subf_cfi.selectedIndex = cfi[2] - 1;
      }
    var cfi_options = document.frm.tdd_spec_subf_cfi.options;
    for (var i = 0; i < cfi_options.length; i++)
      {
      cfi_options[i].disabled = (i + 1 < cfi_min || i + 1 > cfi_max);
      }
    n_pdcch_syms[2] = cfi[2] + +(nprbs <= 10);
    }

  cell_id = Math.round(1 * document.frm.cell_id.value);
  if (isNaN(cell_id) || cell_id < 0) cell_id = 0;
  if (cell_id > 503) cell_id = 503;
  document.frm.cell_id.value = cell_id;
  cell_freq_shift = cell_id % 6;
  var cell_id_grp = Math.floor(cell_id / 3);
  var id = cell_id % 3;
  cellIdCommentElem.innerHTML = "(ID group: " + cell_id_grp + ", ID: " + id + ", RS frequency shift: " + cell_freq_shift + ")";

  tx_port = document.frm.tx_port.selectedIndex;
  for (var i = document.frm.tx_port.options.length; i < n_tx_ports; i++)
    {
    document.frm.tx_port.options[i] = new Option(i,i);
    }
  document.frm.tx_port.options.length = n_tx_ports;
  if (tx_port >= n_tx_ports) tx_port = n_tx_ports - 1;
  document.frm.tx_port.selectedIndex = tx_port;

  reg_size[1] = 4 + 2 * (n_tx_ports > 2);
  reg_size[3] = 4 + 2 * (symbolsPerSlot == 6);
  n_avail_regs[0] = 2 * nprbs;
  n_avail_regs[1] = (2 + +(n_tx_ports <= 2)) * nprbs;
  n_avail_regs[2] = 3 * nprbs;
  n_avail_regs[3] = (2 + +(symbolsPerSlot == 7)) * nprbs;
  var n_avail_regs_sym0 = n_avail_regs[0];

  ng_index = document.frm.phich_ng.selectedIndex;
  var phich_mapping_units1 = Math.ceil(ng_numerator[ng_index] * nprbs / (ng_denominator[ng_index] * 8));
  var phich_groups_list = [];
  var phich_groups_plural_mask = 0;
  var phich_regs_list = [];
  var phich_resources_list = [];
  var phich_group_overlap_warning = false;
  for (var phichTypIndex = 0; phichTypIndex < phichTypeList.length; phichTypIndex++)
    {
    var phichTyp = phichTypeList[phichTypIndex];
    phich_mapping_units[phichTypIndex] = phich_mapping_units1 * (phichTyp >> 2);
    var phich_groups = ((symbolsPerSlot == 7) ? 1 : 2) * phich_mapping_units[phichTypIndex];
    if (phich_groups == phich_groups_list.slice(-1)) continue;
    phich_groups_list.push(phich_groups);
    if (phich_groups == 1)
      phich_groups_plural_mask |= 0x1;
    else
      phich_groups_plural_mask |= 0x2;
    var phich_regs = 3 * phich_mapping_units[phichTypIndex];
    phich_regs_list.push(phich_regs);
    var phich_resources = 8 * phich_mapping_units[phichTypIndex];
    phich_resources_list.push(phich_resources);
    if ((phichTyp & 0x3) == 1 && phich_regs > n_avail_regs[0] - 4)
      phich_group_overlap_warning = true;
    }

  var pcfich_reg0 = cell_id % n_avail_regs_sym0;
  pcfich_regs[0] = pcfich_reg0 * 6;
  var pcfich_reg1 = (pcfich_reg0 + Math.floor(nprbs / 2)) % n_avail_regs_sym0;
  pcfich_regs[1] = pcfich_reg1 * 6;
  var pcfich_reg2 = (pcfich_reg0 + nprbs) % n_avail_regs_sym0;
  pcfich_regs[2] = pcfich_reg2 * 6;
  var pcfich_reg3 = (pcfich_reg0 + Math.floor(3 * nprbs / 2)) % n_avail_regs_sym0;
  pcfich_regs[3] = pcfich_reg3 * 6;
  var n_pcfich_regs_below_reg0 = +(pcfich_regs[1] < pcfich_regs[0]) +
                                 +(pcfich_regs[2] < pcfich_regs[0]) +
                                 +(pcfich_regs[3] < pcfich_regs[0]);
  pcfich_regs_sorted[n_pcfich_regs_below_reg0] = pcfich_regs[0];
  pcfich_regs_sorted[(n_pcfich_regs_below_reg0 + 1) & 3] = pcfich_regs[1];
  pcfich_regs_sorted[(n_pcfich_regs_below_reg0 + 2) & 3] = pcfich_regs[2];
  pcfich_regs_sorted[(n_pcfich_regs_below_reg0 + 3) & 3] = pcfich_regs[3];

  var n_pdcch_regs_list = [[], [], []];
  var n_cces_list = [[], [], []];
  var common_search_space_warning = [false, false, false];

  phichTypeIndexToPdcchTypeIndexes = [[], []];

  for (var pdcchTypIndex = 0; pdcchTypIndex < pdcchTypeList.length; pdcchTypIndex++)
    {
    var pdcchTyp = pdcchTypeList[pdcchTypIndex];
    var thisPhyRegs = phy_regs[pdcchTypIndex];
    var thisNPdcchSyms = n_pdcch_syms[pdcchTyp & 0x3];

    n_pdcch_regs[pdcchTypIndex] = -4;

    if (pdcchTyp > 3)
      {
      var phichTypIndex = pdcchTypeIndexToPhichTypeIndex[pdcchTypIndex];
      var phichTyp = phichTypeList[phichTypIndex];

      // Update list of PDCCH type indexes for each PHICH type index
      phichTypeIndexToPdcchTypeIndexes[phichTypIndex].push(pdcchTypIndex);

      var n_phich_regs = 3 * phich_mapping_units[phichTypIndex];
      var n_phich_excess_regs = n_phich_regs - (n_avail_regs[0] - 4);
      if (n_phich_excess_regs > 0 && phichTyp == 9) n_phich_regs -= n_phich_excess_regs;
      n_pdcch_regs[pdcchTypIndex] -= n_phich_regs;
      }

    // Calculate nbr of PDCCH REGs and initialize phy_regs elements to 0
    for (var sym = 0; sym < thisNPdcchSyms; sym++)
      {
      n_pdcch_regs[pdcchTypIndex] += n_avail_regs[sym];
      for (var i = 0; i < n_avail_regs[sym]; i++) thisPhyRegs[sym][i] = 0;
      }
    n_cces[pdcchTypIndex] = Math.floor(n_pdcch_regs[pdcchTypIndex] / 9);
    n_invalid_cce_regs[pdcchTypIndex] = n_pdcch_regs[pdcchTypIndex] - n_cces[pdcchTypIndex] * 9;

    n_pdcch_regs_list[pdcchTyp & 0x3].push(n_pdcch_regs[pdcchTypIndex]);
    n_cces_list[pdcchTyp & 0x3].push(n_cces[pdcchTypIndex]);
    if (n_cces[pdcchTypIndex] < 4)
      {
      common_search_space_warning[pdcchTyp & 0x3] = true;
      }

    // Put PCFICH REGs into phy_regs
    thisPhyRegs[0][pcfich_reg0] = pcfich_type + (0 << 2);
    thisPhyRegs[0][pcfich_reg1] = pcfich_type + (1 << 2);
    thisPhyRegs[0][pcfich_reg2] = pcfich_type + (2 << 2);
    thisPhyRegs[0][pcfich_reg3] = pcfich_type + (3 << 2);
    }

  cfiCommentElem.innerHTML = "(" + n_pdcch_syms[0] + " PDCCH symbol" + ((n_pdcch_syms[0] > 1) ? "s, " : ", ")
    + n_pdcch_regs_list[0].join("/") + " PDCCH REGs, " + n_cces_list[0].join("/") + ' CCEs)<br><span class="warning">'
    + (common_search_space_warning[0] ? '(Warning: No room for common search space if less than 4 CCEs!)' : '&nbsp;') + '<\/span>';

  if (mbsfn_enabled)
    {
    cfiMbsfnCommentElem.innerHTML = "(" + n_pdcch_syms[1] + " PDCCH symbol" + ((n_pdcch_syms[1] > 1) ? "s, " : ", ")
      + n_pdcch_regs_list[1].join("/") + " PDCCH REGs, " + n_cces_list[1].join("/") + ' CCEs)<br><span class="warning">'
      + (common_search_space_warning[1] ? '(Warning: No room for common search space if less than 4 CCEs!)' : '&nbsp;') + '<\/span>';
    }

  if (frameStructType == 2)
    {
    cfiTddSpecSubfCommentElem.innerHTML = "(" + n_pdcch_syms[2] + " PDCCH symbol" + ((n_pdcch_syms[2] > 1) ? "s, " : ", ")
      + n_pdcch_regs_list[2].join("/") + " PDCCH REGs, " + n_cces_list[2].join("/") + ' CCEs)<br><span class="warning">'
      + (common_search_space_warning[2] ? '(Warning: No room for common search space if less than 4 CCEs!)' : '&nbsp;') + '<\/span>';
    }

  phichNgCommentElem.innerHTML = "(" + phich_groups_list.join("/") + " PHICH group" + ((phich_groups_plural_mask == 0x3) ? "(s), " : (phich_groups_plural_mask & 0x2) ? "s, " : ", ")
    + phich_regs_list.join("/") + " REGs, " + phich_resources_list.join("/") + ' PHICH resources)<br><span class="warning">'
    + (phich_group_overlap_warning ? '(Warning: Some groups are overlapping!)' : '&nbsp;') + '<\/span>';

  if (unusualSubframeMask && n_phich_syms == 3)
    {
    phichDurationCommentElem.innerHTML = "(2 symbols in " + unusualSubframeString + "; 3 symbols in others)";
    }
  else
    {
    phichDurationCommentElem.innerHTML = "(" + n_phich_syms + " symbol" + ((n_phich_syms > 1) ? "s)" : ")");
    }

  if (frameStructType == 1)
    {
    hs += make_transmission(colorPSCH, subcarriers/2 - 31, 0, 0, symbolsPerSlot - 1, 62, 1, 1, 1, 5, 2);
    hs += make_transmission(colorSSCH, subcarriers/2 - 31, 0, 0, symbolsPerSlot - 2, 62, 1, 1, 1, 5, 2);
    hs += make_transmission(colorUnused, subcarriers/2 - 36, 0, 0, symbolsPerSlot - 2, 5, 2, 72-5, 2, 5, 2);
    }
  else
    {
    hs += make_transmission(colorPSCH, subcarriers/2 - 31, 1, 0, 2, 62, 1, 1, 1, 5, 2);
    hs += make_transmission(colorUnused, subcarriers/2 - 36, 1, 0, 2, 5, 1, 72-5, 2, 5, 2);
    hs += make_transmission(colorSSCH, subcarriers/2 - 31, 0, 1, symbolsPerSlot - 1, 62, 1, 1, 1, 5, 2);
    hs += make_transmission(colorUnused, subcarriers/2 - 36, 0, 1, symbolsPerSlot - 1, 5, 1, 72-5, 2, 5, 2);
    }
  hs += make_transmission(colorPBCH, subcarriers/2 - 36, 0, 1, 0, 72, 4);
  for (var i = 0; i < 10; i++)
    {
    if (subfPdcchTypeIndexes[i] < 0) continue; // Skip uplink subframe
    hs += make_transmission(colorPDCCH, 0, i, 0, 0, subcarriers, n_pdcch_syms[pdcchTypeList[subfPdcchTypeIndexes[i]] & 0x3]);
    }

  if (mbsfn_enabled)
    {
    mbsfnElem.innerHTML = make_transmission(colorMBSFN, 0, mbsfn_subframe, 0, n_pdcch_syms[1], subcarriers, symbolsPerSlot * 2 - n_pdcch_syms[1]);
    }
  else
    {
    mbsfnElem.innerHTML = "";
    }

  n_avail_regs[0] = n_avail_regs_sym0 - 4;

  for (var phichTypIndex = 0; phichTypIndex < phichTypeList.length; phichTypIndex++)
    {
    hs += calc_phich_regs(phichTypIndex);
    }

  hs += make_transmission(colorPCFICH, pcfich_regs[0], 0, 0, 0, 6, 1, 1, 1, 1, 10);
  hs += make_transmission(colorPCFICH, pcfich_regs[1], 0, 0, 0, 6, 1, 1, 1, 1, 10);
  hs += make_transmission(colorPCFICH, pcfich_regs[2], 0, 0, 0, 6, 1, 1, 1, 1, 10);
  hs += make_transmission(colorPCFICH, pcfich_regs[3], 0, 0, 0, 6, 1, 1, 1, 1, 10);

  dynTransmissionElem.innerHTML = hs;

  update_RS_transmission();

  for (var pdcchTypIndex = 0; pdcchTypIndex < pdcchTypeList.length; pdcchTypIndex++)
    {
    calc_pdcch_regs(phy_regs[pdcchTypIndex], pdcch_phy_regs[pdcchTypIndex], pdcch_cce_regs[pdcchTypIndex],
      n_pdcch_syms[pdcchTypeList[pdcchTypIndex] & 0x3]);
    }

  update_marker();
  }

function create_grid()
  {
  gridTopHdr7Elem.style.height = first_re_y + "px";
  gridTopHdr6Elem.style.height = first_re_y + "px";

  var prb_pitch = (img_height - first_re_y);
  var hs, gs;
  hs = '';
  gs = '<div class="img_clip" style="width:auto;height:' + prb_pitch + 'px"><div class="img_pan" style="top:' + (-first_re_y) + 'px"><img src="' + gridFileList[0] + '" alt=""><\/div><\/div>';
  for (var prb = 0; prb < 100; prb++) hs += gs;
  gridGrp7Elem.innerHTML = hs;

  hs = '';
  gs = '<div class="img_clip" style="width:auto;height:' + prb_pitch + 'px"><div class="img_pan" style="top:' + (-first_re_y) + 'px"><img src="' + gridFileList[1] + '" alt=""><\/div><\/div>';
  for (var prb = 0; prb < 100; prb++) hs += gs;
  gridGrp6Elem.innerHTML = hs;

  create_transmissions();
  }

function update_grid()
  {
  frameStructType = document.frm.duplex_mode.selectedIndex + 1;
  bw_index = document.frm.bw.selectedIndex;
  cp_index = document.frm.cp.selectedIndex;
  nprbs = nprbsList[bw_index];
  subcarriers = nprbs * 12;
  symbolsPerSlot = symbolsPerSlotList[cp_index];
  duplexCommentElem.innerHTML = "(Frame structure type " + frameStructType + ")";
  bwCommentElem.innerHTML = "(" + nprbs + " PRBs, " + subcarriers + " subcarriers)";
  cpCommentElem.innerHTML = "(" + symbolsPerSlot + " symbols per slot, " + ((symbolsPerSlot == 7) ? 8 : 4) + " PHICH resources per PHICH group)";

  if (symbolsPerSlot == 7)
    {
    gridTopHdr6Elem.style.display = "none";
    gridGrp6Elem.style.display = "none";
    gridTopHdr7Elem.style.display = "block";
    gridGrp7Elem.style.display = "block";
    }
  else
    {
    gridTopHdr7Elem.style.display = "none";
    gridGrp7Elem.style.display = "none";
    gridTopHdr6Elem.style.display = "block";
    gridGrp6Elem.style.display = "block";
    }

  var prb_pitch = (img_height - first_re_y);
  gridMainElem.style.height = prb_pitch * nprbs + "px";
  gridMainPanElem.style.top = -prb_pitch * (100 - nprbs) + "px";

  update_transmissions();
  }

function update_transmissions_on_enter_key(e, obj)
  {
  if (e.keyCode == 13)
    {
    update_transmissions();
    obj.select();
    return false;
    }
  return true;
  }

function update_marker_on_enter_key(e, obj)
  {
  if (e.keyCode == 13)
    {
    update_marker();
    obj.select();
    return false;
    }
  return true;
  }

function init()
  {
  isMSIE7 = false;
  if (document.getElementById("msie7")) isMSIE7 = true;
  document.getElementById("noscript").style.display = "none";
  gridTopHdr7Elem = document.getElementById("grid_tophdr_div7");
  gridTopHdr6Elem = document.getElementById("grid_tophdr_div6");
  gridMainElem = document.getElementById("grid_main_div");
  gridMainPanElem = document.getElementById("grid_main_pan_div");
  gridGrp7Elem = document.getElementById("grid_grp_div7");
  gridGrp6Elem = document.getElementById("grid_grp_div6");
  transmissionElem = document.getElementById("transmission_grp_div");
  dynTransmissionElem = document.getElementById("dyn_transmission_grp_div");
  mbsfnElem = document.getElementById("mbsfn_div");
  ulElem = document.getElementById("ul_div");
  duplexCommentElem = document.getElementById("duplex_comment_div");
  tddUlDlCfgRowElem = document.getElementById("tdd_ul_dl_cfg_row");
  tddUlDlCfgCommentElem = document.getElementById("tdd_ul_dl_cfg_comment_div");
  tddSpecSubfCfgRowElem = document.getElementById("tdd_spec_subf_cfg_row");
  tddSpecSubfCfgCommentElem = document.getElementById("tdd_spec_subf_cfg_comment_div");
  bwCommentElem = document.getElementById("bw_comment_div");
  cpCommentElem = document.getElementById("cp_comment_div");
  cfiCommentElem = document.getElementById("cfi_comment_div");
  cfiTddSpecSubfRowElem = document.getElementById("tdd_spec_subf_cfi_row");
  cfiTddSpecSubfCommentElem = document.getElementById("tdd_spec_subf_cfi_comment_div");
  cfiMbsfnRowElem = document.getElementById("mbsfn_cfi_row");
  cfiMbsfnCommentElem = document.getElementById("mbsfn_cfi_comment_div");
  cellIdCommentElem = document.getElementById("cell_id_comment_div");
  phichNgCommentElem = document.getElementById("phich_ng_comment_div");
  phichDurationCommentElem = document.getElementById("phich_duration_comment_div");
  mbsfnCommentElem = document.getElementById("mbsfn_comment_div");
  markerExtraRowElem = document.getElementById("marker_extra_row");
  markerPcfichElem = document.getElementById("marker_pcfich_div");
  markerPhichElem = document.getElementById("marker_phich_div");
  markerPdcchElem = document.getElementById("marker_pdcch_div");
  markerPdcchLogicalElem = document.getElementById("marker_pdcch_logical_div");
  markerCceRangeElem = document.getElementById("marker_cce_range_div");
  markerPdcchPhysicalElem = document.getElementById("marker_pdcch_physical_div");
  markerPhyRegRangeElem = document.getElementById("marker_phy_reg_range_div");
  markerNoteElem = document.getElementById("marker_note_div");
  markerElem = document.getElementById("marker_div");
  markerClipElem = document.getElementById("marker_clip_div");
  markerPanElem = document.getElementById("marker_pan_div");
  directLinkElem = document.getElementById("direct_link");
  resetLinkElem = document.getElementById("reset_link");
  calcPdschLinkElem = document.getElementById("calc_pdsch_link");

  document.getElementById("legend_psch").style.backgroundColor = colorPSCH;
  document.getElementById("legend_ssch").style.backgroundColor = colorSSCH;
  document.getElementById("legend_pbch").style.backgroundColor = colorPBCH;
  document.getElementById("legend_rs").style.backgroundColor = colorRS;
  document.getElementById("legend_ul").style.backgroundColor = colorUL;
  document.getElementById("legend_pcfich").style.backgroundColor = colorPCFICH;
  document.getElementById("legend_phich").style.backgroundColor = colorPHICH;
  document.getElementById("legend_pdcch").style.backgroundColor = colorPDCCH;
  document.getElementById("legend_unused").style.backgroundColor = colorUnused;
  document.getElementById("legend_avail").style.backgroundColor = colorAvailable;
  document.getElementById("legend_gp").style.backgroundColor = colorGP;
  document.getElementById("legend_mbsfn").style.backgroundColor = colorMBSFN;

  create_grid();

  var args = location.href.split("?");
  if (args.length == 2) {
    args = args[1].split("&");
    for (var i = 0; i < args.length; i++)
      {
      var single_arg = args[i].split("=");
      var elem = document.frm[single_arg[0]];
      if (single_arg.length == 2 && elem)
        {
        if (elem.options)
          {
          for (var j = 0; j < elem.options.length; j++)
            {
            if (elem.options[j].value == single_arg[1])
              {
              elem.selectedIndex = j;
              break;
              }
            }
          }
        else
          {
          elem.value = single_arg[1];
          }
        }
      }
    }

  update_grid();
  }

window.onload = init;