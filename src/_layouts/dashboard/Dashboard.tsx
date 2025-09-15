import React from "react";
import BarChart from "@/_components/Charts/BarChart";
import { useLocale } from "@/_hooks/useLocale";
import { dashboardCss } from "./Dashboard.styles";
import { useSessionStore } from "@/_stores/useSessionStore";
import Badge from "@/_components/Badge/Badge";
import PotsSection from "@/_components/HoldingsSection/HoldingsSection";

const Dashboard = () => {
  const { t } = useLocale();
  const { session } = useSessionStore();

  // 입금이 있던 날짜만
  const depositsData = [
    { day: "8/15", deposits: 950000 },
    { day: "8/17", deposits: 1200000 },
    { day: "8/19", deposits: 1650000 },
    { day: "8/21", deposits: 1100000 },
    { day: "8/23", deposits: 1200000 },
    { day: "8/25", deposits: 1800000 },
    { day: "8/26", deposits: 1600000 },
    { day: "8/27", deposits: 2100000 },
    { day: "8/28", deposits: 2200000 },
    { day: "8/29", deposits: 2500000 },
  ];

  // 출금이 있던 날짜만
  const withdrawalsData = [
    { day: "8/16", withdrawals: 750000 },
    { day: "8/18", withdrawals: 850000 },
    { day: "8/20", withdrawals: 1300000 },
    { day: "8/22", withdrawals: 650000 },
    { day: "8/23", withdrawals: 800000 },
    { day: "8/24", withdrawals: 900000 },
    { day: "8/26", withdrawals: 1000000 },
    { day: "8/27", withdrawals: 1200000 },
    { day: "8/28", withdrawals: 1400000 },
    { day: "8/29", withdrawals: 1600000 },
  ];

  // 입출금 통합 - 같은 날짜면 합치고, 다른 날짜면 각각 표시
  const allDays = new Set([
    ...depositsData.map((item) => item.day),
    ...withdrawalsData.map((item) => item.day),
  ]);

  const combinedData = Array.from(allDays)
    .map((day) => {
      const depositItem = depositsData.find((item) => item.day === day);
      const withdrawalItem = withdrawalsData.find((item) => item.day === day);

      return {
        day,
        deposits: depositItem?.deposits || 0,
        withdrawals: withdrawalItem?.withdrawals || 0,
      };
    })
    .sort((a, b) => {
      const dayA = parseInt(a.day.split("/")[1]);
      const dayB = parseInt(b.day.split("/")[1]);
      return dayA - dayB;
    });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("ko-KR").format(value) + "원";
  };

  return (
    <div css={dashboardCss.container}>
      <div css={dashboardCss.userInfoWrapper}>
        <div css={dashboardCss.userInfo}>
          <div css={dashboardCss.userInfoAvatar}>
            <img
              src={session?.icon ?? "/images/default.jpeg"}
              alt={session?.name ?? "avatar"}
            />
          </div>
          <div css={dashboardCss.userInfoNameWrapper}>
            <Badge type="infoSuccess" cssStyle={dashboardCss.userInfoBadge}>
              {`level ${session?.level ?? 0}`}
            </Badge>
            <b css={dashboardCss.userName}>{session?.name}</b>
          </div>
        </div>
        <div css={dashboardCss.userInfoCountWrapper}>
          <b css={dashboardCss.userInfoCountTitle}>현재 현황</b>
          <div css={dashboardCss.userInfoCount}>
            <PotsSection label="하위 에이전트 수" value={3} />
            <PotsSection label="회원 수" value={7} />
          </div>
        </div>
      </div>

      <div css={dashboardCss.chartsRow}>
        <div css={dashboardCss.chartWrapper}>
          <BarChart
            data={depositsData}
            xDataKey="day"
            barDataKey={["deposits"]}
            barColor={["#A78BFA"]}
            title={t("dashboard.thisMonthDeposits")}
            id="deposits-chart"
            yFormatter={formatCurrency}
            tooltipFormatter={formatCurrency}
          />
        </div>

        <div css={dashboardCss.chartWrapper}>
          <BarChart
            data={withdrawalsData}
            xDataKey="day"
            barDataKey={["withdrawals"]}
            barColor={["#F472B6"]}
            title={t("dashboard.thisMonthWithdrawals")}
            id="withdrawals-chart"
            yFormatter={formatCurrency}
            tooltipFormatter={formatCurrency}
          />
        </div>
      </div>
      <div>
        <BarChart
          data={combinedData}
          xDataKey="day"
          barDataKey={["deposits", "withdrawals"]}
          barColor={["#A78BFA", "#F472B6"]}
          title={t("dashboard.thisMonthTransactions")}
          id="combined-chart"
          yFormatter={formatCurrency}
          tooltipFormatter={formatCurrency}
        />
      </div>
    </div>
  );
};

export default Dashboard;
