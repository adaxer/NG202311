using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace MovieBase.Common;

public class MovieDTO
{
    public int Id { get; set; }

    [JsonProperty("description")]
    public string Info { get; set; }
}
