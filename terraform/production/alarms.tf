import {
  to = aws_cloudwatch_metric_alarm.research_catalog_error
  id = "ResearchCatalogErrorAlarm"
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
    "arn:aws:sns:us-east-1:946183545209:ResearchCatalogError-production"
  ]
  datapoints_to_alarm = 1

  treat_missing_data = "missing"
  tags = {
    Project      = "Research Catalog"
    BusinessUnit = "LSP"
    Environment  = "production"
  }
}