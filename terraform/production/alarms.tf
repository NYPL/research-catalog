resource "aws_cloudwatch_log_metric_filter" "research_catalog_error" {
  name           = "ResearchCatalogError"
  log_group_name = "/ecs/research-catalog-production"

  pattern = "{ $.level = \"error\" && $.message = \"*Error in*\" }"

  metric_transformation {
    name      = "ResearchCatalogError"
    namespace = "LogMetrics"
    value     = "1"
  }
}

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
    "arn:aws:sns:us-east-1:946183545209:ResearchCatalogErrorAlarm"
  ]
  datapoints_to_alarm = 1

  treat_missing_data = "notBreaching"
}