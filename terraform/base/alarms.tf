/* 
DevOps covers these metric alarms for the production, qa, and train environments:
research-catalog-{env}_alb_health
research-catalog-{env}_alb500_scale_up
research-catalog-{env}_alb500_scale_dn
research-catalog-{env}_memory
research-catalog-{env}_cpu
research-catalog-{env}-task-deploy
research-catalog-{env}-min-task-count
research-catalog-{env}-min-instance-count
*/

resource "aws_cloudwatch_metric_alarm" "research_catalog_error" {
  alarm_name = "ResearchCatalogErrorAlarm"

  alarm_description = "Triggered when there's 5 or more error logs to Research Catalog within 5 minutes."

  namespace   = "LogMetrics"
  metric_name = "ResearchCatalogError"

  statistic = "Sum"

  period              = 300
  evaluation_periods  = 1
  threshold           = 5
  comparison_operator = "GreaterThanThreshold"

  alarm_actions = [
    "arn:aws:sns:us-east-1:946183545209:ResearchCatalogError-production"
  ]
  datapoints_to_alarm = 1

  treat_missing_data = "missing"
  tags = local.tags
}