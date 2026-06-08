{{- define "portfolio.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "portfolio.fullname" -}}
{{- printf "%s" (include "portfolio.name" .) -}}
{{- end -}}
