"use client";

import React from 'react';
import Link from 'next/link';
import styles from './logs.module.css';

export default function LogsPage() {
  const transactions = [
    { name: "TEST1", email: "justkaybuild@gmail.com", plan: "FREE TRIAL", active: true, tokens: 0, uptime: "24 MS" },
    { name: "AYUSH YADAV", email: "", plan: "FREE TRIAL", active: true, tokens: 0, uptime: "24 MS" },
    { name: "XYZ", email: "", plan: "FREE TRIAL", active: true, tokens: 0, uptime: "24 MS" },
    { name: "MAYANK", email: "mayank542work@gmail.com", plan: "AGENCIES / HEAVY DUTY", active: true, tokens: 5, uptime: "24 MS" },
    { name: "NEW", email: "", plan: "FREE TRIAL", active: false, tokens: 0, uptime: "24 MS" },
  ];

  const downloadCSV = () => {
    const headers = ["IDENTITY", "EMAIL", "SUBSCRIPTION", "RESOURCES (TOKENS %)", "UPTIME / LATENCY"];
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => `${t.name},${t.email},${t.plan},${t.tokens}%,${t.uptime}`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "user_transaction_logs.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.pageContainer}>
      
      {/* Top Navigation */}
      <div className={styles.topNav}>
        <div className={styles.navLeft}>
          <div className={styles.logoBlock}></div>
          <span>RUDRANEX admin</span>
        </div>
        
        <div className={styles.navCenter}>
          <Link href="/dashboard" className={styles.navItem}>
            <span>▦</span> DASHBOARD
          </Link>
          <div className={`${styles.navItem} ${styles.active}`}>
            <span>▤</span> TABLE LOGS
          </div>
          <div className={styles.navItem}>
            <span>⚡</span> PLANS
          </div>
        </div>

        <div className={styles.navRight}>
          <button className={styles.iconBtn}>⟳</button>
          <button className={styles.iconBtn}>☾</button>
          <button className={`${styles.iconBtn} ${styles.primary}`}>➡</button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.logTableCard}>
          <div className={styles.logTableHeader}>
             <div>
               <div className={styles.logTitle}>USER TRANSACTION LOGS</div>
               <div className={styles.logSubtitle}>FULL SYSTEM REGISTRY - 16 ACTIVE NODES</div>
             </div>
             <div className={styles.logActions}>
               <div className={styles.filterInput}>
                 <span>⌕</span>
                 <input type="text" placeholder="FILTER LOGS..." />
               </div>
               <button onClick={downloadCSV} className={styles.btnExport}>
                 EXPORT CSV
               </button>
             </div>
          </div>
          
          <table className={styles.logTable}>
            <thead>
              <tr>
                <th>IDENTITY</th>
                <th>SUBSCRIPTION</th>
                <th>RESOURCES</th>
                <th>UPTIME / LATENCY</th>
                <th style={{textAlign: 'right'}}>ADMINISTRATIVE</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, index) => (
                <tr key={index}>
                  <td>
                    <div className={styles.logIdentity}>
                      <div className={styles.logAvatar}>👤</div>
                      <div>
                        <div className={styles.logName}>{txn.name}</div>
                        {txn.email && <div className={styles.logEmail}>{txn.email}</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.logPlan}>{txn.plan}</div>
                    {txn.active && (
                      <div className={styles.logStatus}>
                        <div className={styles.statusDot}></div> ACTIVE
                      </div>
                    )}
                  </td>
                  <td>
                    <div className={styles.logResource}>
                      <div className={styles.resourceHeader}>
                        <span>TOKENS</span>
                        <span>{txn.tokens}%</span>
                      </div>
                      <div className={styles.resourceBar}>
                        <div className={styles.resourceFill} style={{width: `${txn.tokens}%`}}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.logUptime}>
                      <span style={{color: '#0fd87a'}}>📈</span> {txn.uptime}
                    </div>
                  </td>
                  <td style={{textAlign: 'right'}}>
                    <button className={styles.btnVisualize}>VISUALIZE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
