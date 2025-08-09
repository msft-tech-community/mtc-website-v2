import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Activity,
    Server,
    Clock,
    Zap,
    Database,
    Globe,
    Cpu,
    HardDrive,
    Wifi,
    AlertTriangle,
    CheckCircle,
    XCircle,
    BarChart3,
    TrendingUp,
    Shield,
    RefreshCw,
} from "lucide-react";
import "./Health.css";

export default function Health() {
    const [healthData, setHealthData] = useState({
        status: "loading",
        latency: null,
        uptime: null,
        responseTime: null,
        memoryUsage: null,
        cpuUsage: null,
        diskSpace: null,
        networkStatus: null,
        apiStatus: null,
        databaseStatus: null,
        lastChecked: null,
        incidents: [],
        performance: {
            score: null,
            metrics: {},
        },
    });

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [historicalData, setHistoricalData] = useState([]);
    const [alertsSent, setAlertsSent] = useState(0);

    // Webhook function to send health alerts
    const sendHealthWebhook = async (alertData) => {
        const webhookUrl =
            "https://discord.com/api/webhooks/1403638832741744712/XE7bPMUI5usBHH9lMoBO8peM5u_MhWJeqlyvibwoUCrG0uScLarJyKbqRB9QniqMMv9e";

        const embed = {
            title: "🏥 Site Health Alert",
            color:
                alertData.severity === "critical"
                    ? 0xff0000
                    : alertData.severity === "warning"
                    ? 0xffa500
                    : 0x00ff00,
            fields: [
                {
                    name: "🚨 Alert Type",
                    value: alertData.type,
                    inline: true,
                },
                {
                    name: "⚠️ Severity",
                    value: alertData.severity.toUpperCase(),
                    inline: true,
                },
                {
                    name: "📊 Current Status",
                    value: alertData.status,
                    inline: true,
                },
                {
                    name: "📈 Metrics",
                    value: JSON.stringify(alertData.metrics, null, 2),
                    inline: false,
                },
                {
                    name: "🕒 Timestamp",
                    value: new Date().toLocaleString(),
                    inline: true,
                },
            ],
            footer: {
                text: "Microsoft Tech Community - Health Monitor",
                icon_url:
                    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            },
            timestamp: new Date().toISOString(),
        };

        try {
            await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ embeds: [embed] }),
            });
            setAlertsSent((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to send health webhook:", error);
        }
    };

    // Comprehensive health check function
    const performHealthCheck = async () => {
        const startTime = performance.now();
        const checkTime = new Date().toLocaleString();

        try {
            // Basic connectivity test
            const response = await fetch(window.location.origin + "/health", {
                cache: "no-store",
                method: "HEAD",
            });

            const endTime = performance.now();
            const responseTime = Math.round(endTime - startTime);

            // Simulate additional metrics (in a real app, these would come from your backend)
            const simulatedMetrics = {
                memoryUsage: Math.floor(Math.random() * 30) + 40, // 40-70%
                cpuUsage: Math.floor(Math.random() * 20) + 10, // 10-30%
                diskSpace: Math.floor(Math.random() * 15) + 75, // 75-90%
                uptime: Math.floor(Math.random() * 30) + 1, // 1-30 days
                apiStatus: Math.random() > 0.1 ? "healthy" : "degraded",
                databaseStatus: Math.random() > 0.05 ? "connected" : "slow",
                networkStatus:
                    responseTime < 500
                        ? "excellent"
                        : responseTime < 1000
                        ? "good"
                        : "poor",
            };

            // Calculate performance score
            let performanceScore = 100;
            if (responseTime > 1000) performanceScore -= 20;
            if (responseTime > 2000) performanceScore -= 30;
            if (simulatedMetrics.cpuUsage > 80) performanceScore -= 15;
            if (simulatedMetrics.memoryUsage > 85) performanceScore -= 15;

            const newHealthData = {
                status: response.ok ? "healthy" : "unhealthy",
                latency: responseTime,
                responseTime: responseTime,
                lastChecked: checkTime,
                ...simulatedMetrics,
                performance: {
                    score: Math.max(performanceScore, 0),
                    metrics: {
                        responseTime,
                        uptime: simulatedMetrics.uptime,
                        reliability: Math.floor(Math.random() * 5) + 95,
                    },
                },
                incidents: healthData.incidents,
            };

            // Check for alerts
            if (
                responseTime > 2000 ||
                simulatedMetrics.cpuUsage > 90 ||
                simulatedMetrics.memoryUsage > 90
            ) {
                await sendHealthWebhook({
                    type: "Performance Alert",
                    severity: responseTime > 5000 ? "critical" : "warning",
                    status: newHealthData.status,
                    metrics: {
                        responseTime: `${responseTime}ms`,
                        cpu: `${simulatedMetrics.cpuUsage}%`,
                        memory: `${simulatedMetrics.memoryUsage}%`,
                    },
                });
            }

            setHealthData(newHealthData);

            // Update historical data
            setHistoricalData((prev) => [
                ...prev.slice(-29), // Keep last 30 entries
                {
                    timestamp: Date.now(),
                    responseTime,
                    cpuUsage: simulatedMetrics.cpuUsage,
                    memoryUsage: simulatedMetrics.memoryUsage,
                },
            ]);
        } catch (error) {
            console.error("Health check failed:", error);
            const errorData = {
                status: "error",
                latency: "N/A",
                responseTime: "N/A",
                lastChecked: checkTime,
                memoryUsage: "N/A",
                cpuUsage: "N/A",
                diskSpace: "N/A",
                uptime: "N/A",
                apiStatus: "error",
                databaseStatus: "error",
                networkStatus: "error",
                performance: { score: 0, metrics: {} },
                incidents: [
                    ...healthData.incidents,
                    {
                        id: Date.now(),
                        type: "Connection Error",
                        time: checkTime,
                        resolved: false,
                    },
                ],
            };

            setHealthData(errorData);

            await sendHealthWebhook({
                type: "System Error",
                severity: "critical",
                status: "offline",
                metrics: { error: error.message },
            });
        }
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await performHealthCheck();
        setTimeout(() => setIsRefreshing(false), 1000);
    };

    useEffect(() => {
        performHealthCheck();
        // Set up periodic health checks every 30 seconds
        const interval = setInterval(performHealthCheck, 30000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "healthy":
                return "#22c55e";
            case "warning":
                return "#f59e0b";
            case "error":
            case "unhealthy":
                return "#ef4444";
            default:
                return "#6b7280";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "healthy":
                return <CheckCircle size={24} />;
            case "warning":
                return <AlertTriangle size={24} />;
            case "error":
            case "unhealthy":
                return <XCircle size={24} />;
            default:
                return <Activity size={24} />;
        }
    };

    const healthMetrics = [
        {
            title: "Response Time",
            value:
                healthData.responseTime !== null
                    ? `${healthData.responseTime}ms`
                    : "Checking...",
            icon: <Zap size={20} />,
            status:
                healthData.responseTime < 500
                    ? "healthy"
                    : healthData.responseTime < 1000
                    ? "warning"
                    : "error",
            description: "Server response latency",
        },
        {
            title: "CPU Usage",
            value:
                healthData.cpuUsage !== null
                    ? `${healthData.cpuUsage}%`
                    : "N/A",
            icon: <Cpu size={20} />,
            status:
                healthData.cpuUsage < 70
                    ? "healthy"
                    : healthData.cpuUsage < 85
                    ? "warning"
                    : "error",
            description: "Current processor utilization",
        },
        {
            title: "Memory Usage",
            value:
                healthData.memoryUsage !== null
                    ? `${healthData.memoryUsage}%`
                    : "N/A",
            icon: <HardDrive size={20} />,
            status:
                healthData.memoryUsage < 80
                    ? "healthy"
                    : healthData.memoryUsage < 90
                    ? "warning"
                    : "error",
            description: "RAM utilization",
        },
        {
            title: "Disk Space",
            value:
                healthData.diskSpace !== null
                    ? `${healthData.diskSpace}%`
                    : "N/A",
            icon: <Database size={20} />,
            status:
                healthData.diskSpace < 85
                    ? "healthy"
                    : healthData.diskSpace < 95
                    ? "warning"
                    : "error",
            description: "Available storage",
        },
        {
            title: "Network Status",
            value: healthData.networkStatus || "Checking...",
            icon: <Wifi size={20} />,
            status:
                healthData.networkStatus === "excellent"
                    ? "healthy"
                    : healthData.networkStatus === "good"
                    ? "warning"
                    : "error",
            description: "Network connectivity quality",
        },
        {
            title: "API Status",
            value: healthData.apiStatus || "Checking...",
            icon: <Server size={20} />,
            status:
                healthData.apiStatus === "healthy"
                    ? "healthy"
                    : healthData.apiStatus === "degraded"
                    ? "warning"
                    : "error",
            description: "API endpoints availability",
        },
        {
            title: "Database",
            value: healthData.databaseStatus || "Checking...",
            icon: <Database size={20} />,
            status:
                healthData.databaseStatus === "connected"
                    ? "healthy"
                    : healthData.databaseStatus === "slow"
                    ? "warning"
                    : "error",
            description: "Database connection status",
        },
        {
            title: "Uptime",
            value:
                healthData.uptime !== null
                    ? `${healthData.uptime} days`
                    : "N/A",
            icon: <Clock size={20} />,
            status:
                healthData.uptime > 7
                    ? "healthy"
                    : healthData.uptime > 1
                    ? "warning"
                    : "error",
            description: "System uptime",
        },
    ];

    return (
        <div className="health-page">
            <div className="health-background">
                <div className="gradient-overlay"></div>
                <div className="animated-grid"></div>
            </div>

            <div className="health-container">
                {/* Header Section */}
                <motion.div
                    className="health-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="header-content">
                        <div className="status-indicator">
                            <motion.div
                                className="status-icon"
                                style={{
                                    color: getStatusColor(healthData.status),
                                }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                {getStatusIcon(healthData.status)}
                            </motion.div>
                            <div className="status-text">
                                <h1>System Health Monitor</h1>
                                <p className="status-description">
                                    Status:{" "}
                                    <span
                                        style={{
                                            color: getStatusColor(
                                                healthData.status
                                            ),
                                        }}
                                    >
                                        {healthData.status.toUpperCase()}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="health-controls">
                            <motion.button
                                className="refresh-btn"
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    animate={{ rotate: isRefreshing ? 360 : 0 }}
                                    transition={{
                                        duration: 1,
                                        repeat: isRefreshing ? Infinity : 0,
                                        ease: "linear",
                                    }}
                                >
                                    <RefreshCw size={20} />
                                </motion.div>
                                {isRefreshing ? "Checking..." : "Refresh"}
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Score */}
                <motion.div
                    className="performance-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <div className="performance-card">
                        <div className="performance-header">
                            <BarChart3 size={24} />
                            <h2>Performance Score</h2>
                        </div>
                        <div className="performance-score">
                            <motion.div
                                className="score-circle"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.3,
                                    type: "spring",
                                    stiffness: 200,
                                }}
                            >
                                <span className="score-value">
                                    {healthData.performance.score !== null
                                        ? healthData.performance.score
                                        : "--"}
                                </span>
                                <span className="score-label">/ 100</span>
                            </motion.div>
                            <div className="score-details">
                                <div className="score-item">
                                    <span>Response Time</span>
                                    <span>
                                        {healthData.performance.metrics
                                            .responseTime || "--"}
                                        ms
                                    </span>
                                </div>
                                <div className="score-item">
                                    <span>Uptime</span>
                                    <span>
                                        {healthData.performance.metrics
                                            .uptime || "--"}{" "}
                                        days
                                    </span>
                                </div>
                                <div className="score-item">
                                    <span>Reliability</span>
                                    <span>
                                        {healthData.performance.metrics
                                            .reliability || "--"}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Health Metrics Grid */}
                <motion.div
                    className="metrics-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {healthMetrics.map((metric, index) => (
                        <motion.div
                            key={metric.title}
                            className="metric-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 * index }}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="metric-header">
                                <div
                                    className="metric-icon"
                                    style={{
                                        color: getStatusColor(metric.status),
                                    }}
                                >
                                    {metric.icon}
                                </div>
                                <h3>{metric.title}</h3>
                            </div>
                            <div
                                className="metric-value"
                                style={{ color: getStatusColor(metric.status) }}
                            >
                                {metric.value}
                            </div>
                            <p className="metric-description">
                                {metric.description}
                            </p>
                            <div className="metric-status">
                                <div
                                    className={`status-dot ${metric.status}`}
                                    style={{
                                        backgroundColor: getStatusColor(
                                            metric.status
                                        ),
                                    }}
                                ></div>
                                <span className="status-label">
                                    {metric.status}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* System Info */}
                <motion.div
                    className="system-info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="info-card">
                        <div className="info-header">
                            <Shield size={20} />
                            <span>System Information</span>
                        </div>
                        <div className="info-grid">
                            <div className="info-item">
                                <span>Last Checked:</span>
                                <span>{healthData.lastChecked || "Never"}</span>
                            </div>
                            <div className="info-item">
                                <span>Alerts Sent:</span>
                                <span>{alertsSent}</span>
                            </div>
                            <div className="info-item">
                                <span>Health Checks:</span>
                                <span>{historicalData.length}</span>
                            </div>
                            <div className="info-item">
                                <span>Auto Refresh:</span>
                                <span>Every 30s</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recent Incidents */}
                {healthData.incidents.length > 0 && (
                    <motion.div
                        className="incidents-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3>Recent Incidents</h3>
                        <div className="incidents-list">
                            {healthData.incidents.slice(-5).map((incident) => (
                                <div
                                    key={incident.id}
                                    className="incident-item"
                                >
                                    <AlertTriangle size={16} color="#f59e0b" />
                                    <span>{incident.type}</span>
                                    <span className="incident-time">
                                        {incident.time}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
