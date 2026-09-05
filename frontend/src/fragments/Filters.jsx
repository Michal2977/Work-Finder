
function Filters({workMode,setWorkMode,contractType,setContractType,employmentType,setEmploymentType,jobCategory
    ,setJobCategory,salaryPeriod,setSalaryPeriod,setPage,jobCategoryCounts,jobWorkModeCount,countJobContactType,countJobEmploymentType
,countJobSalaryPeriod,publicationDate,setPublicationDate,publicationDateCounts,salary,setSalary,salaryType,setSalaryType,
selectedSalaryPeriod,setSelectedSalaryPeriod,countJobSalary,currency,setCurrency}){
    return(
         <div>

    <div>
         <label>Publication Time</label>
    <label>
        <input type="checkbox" value="24h" checked={publicationDate.includes("24h")}
            onChange={(e) => {setPublicationDate(prev =>
                e.target.checked ? [...prev, e.target.value] : prev.filter(time => time !== e.target.value));setPage(0);}}/>
        24h: ({publicationDateCounts?.[0] ?? 0})
    </label>
   </div>
     <div>
         <label>Publication Time</label>
    <label>
        <input type="checkbox" value="3d" checked={publicationDate.includes("3d")}
            onChange={(e) => {setPublicationDate(prev =>
                e.target.checked ? [...prev, e.target.value] : prev.filter(time => time !== e.target.value));setPage(0);}}/>
        3d: ({publicationDateCounts?.[1] ?? 0})
    </label>
   </div>
       <div>
         <label>Publication Time</label>
    <label>
        <input type="checkbox" value="7d" checked={publicationDate.includes("7d")}
            onChange={(e) => {setPublicationDate(prev =>
                e.target.checked ? [...prev, e.target.value] : prev.filter(time => time !== e.target.value));setPage(0);}}/>
        7d: ({publicationDateCounts?.[2] ?? 0})
    </label>
   </div>
       <div>
         <label>Publication Time</label>
    <label>
        <input type="checkbox" value="14d" checked={publicationDate.includes("14d")}
            onChange={(e) => {setPublicationDate(prev =>
                e.target.checked ? [...prev, e.target.value] : prev.filter(time => time !== e.target.value));setPage(0);}}/>
        14d: ({publicationDateCounts?.[3] ?? 0})
    </label>
   </div>
       <div>
         <label>Publication Time</label>
    <label>
        <input type="checkbox" value="30d" checked={publicationDate.includes("30d")}
            onChange={(e) => {setPublicationDate(prev =>
                e.target.checked ? [...prev, e.target.value] : prev.filter(time => time !== e.target.value));setPage(0);}}/>
        30d: ({publicationDateCounts?.[4] ?? 0})
        
    </label>
   </div>
       <div>
         <label>Publication Time</label>
    <label>
        <input type="checkbox" value="60d" checked={publicationDate.includes("60d")}
            onChange={(e) => {setPublicationDate(prev =>
                e.target.checked ? [...prev, e.target.value] : prev.filter(time => time !== e.target.value));setPage(0);}}/>
        60d: ({publicationDateCounts?.[5] ?? 0})
    </label>
   </div>
         <div>



    <label>Work mode</label>
    <div>
        <label>
            <input type="checkbox" value="ONSITE" checked={workMode.includes("ONSITE")}
                onChange={(e) => {setWorkMode(prev =>
                e.target.checked? [...prev, e.target.value]: prev.filter(mode => mode !== e.target.value));setPage(0);}}/>
                        ONSITE: ({jobWorkModeCount.find(count => count[0] === "ONSITE")?.[1] ?? 0})</label>
      </div>
    
    <div>
        <label>
            <input type="checkbox" value="HYBRID" checked={workMode.includes("HYBRID")}
                onChange={(e) => {setWorkMode(prev =>e.target.checked ? [...prev, e.target.value]: prev.filter(mode => mode !== e.target.value));
                    setPage(0);}}/>HYBRID: ({jobWorkModeCount.find(count => count[0] === "HYBRID")?.[1] ?? 0})</label>
    </div>
    <div>
        <label>
            <input type="checkbox" value="REMOTE"checked={workMode.includes("REMOTE")}
                onChange={(e) => {setWorkMode(prev => e.target.checked? [...prev, e.target.value]
                            : prev.filter(mode => mode !== e.target.value) );setPage(0);}}/>
                             REMOTE: ({jobWorkModeCount.find(count => count[0] === "REMOTE")?.[1] ?? 0})</label>
    </div>
</div>


    <div>
        <input type="number" placeholder="salary" value={salary} onChange={(e) => setSalary(e.target.value)}/>
        <p >{countJobSalary}</p>
        <br/>
        <label>Salary Type : </label>
        <label>
        <input type="radio" value="GROSS" checked={salaryType === "GROSS"} onChange={(e) => setSalaryType(e.target.value)}/>
        GROSS
        </label>
        <br/>
        <label>
        <input type="radio" value="NET" checked={salaryType === "NET"} onChange={(e) => setSalaryType(e.target.value)}/>
        NET
        </label>
        <br/>
         <select value={currency} onChange={(e) => setCurrency(e.target.value)} >
          <option value="">Choose currency</option>
          <option value="PLN">PLN</option>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          

          <option value="CHF">CHF</option>
          <option value="SEK">SEK</option>
          <option value="NOK">NOK</option>
          <option value="DKK">DKK</option>

          <option value="CZK">CZK</option>
          <option value="CAD">CAD</option>
          <option value="AUD">AUD</option>
          <option value="JPY">JPY</option>
         </select>

       <label>Salary Period</label>
        <label>
        <input type="radio" value="HOUR" checked={selectedSalaryPeriod === "HOUR"} onChange={(e) => setSelectedSalaryPeriod(e.target.value)}/>
        HOUR
        </label>
        <label>
        <input type="radio" value="DAY" checked={selectedSalaryPeriod === "DAY"} onChange={(e) => setSelectedSalaryPeriod(e.target.value)}/>
        DAY
        </label>
        <label>
        <input type="radio" value="WEEK" checked={selectedSalaryPeriod === "WEEK"} onChange={(e) => setSelectedSalaryPeriod(e.target.value)}/>
        WEEK
        </label>
        <label>
        <input type="radio" value="MONTH" checked={selectedSalaryPeriod === "MONTH"} onChange={(e) => setSelectedSalaryPeriod(e.target.value)}/>
        MONTH
        </label>
        <label>
        <input type="radio" value="YEAR" checked={selectedSalaryPeriod === "YEAR"} onChange={(e) => setSelectedSalaryPeriod(e.target.value)}/>
        YEAR
        </label>

    </div>

   
        <label>Contract Type</label> 
<div> 
    <label> 
        <input type="checkbox" value="EMPLOYMENT_CONTRACT" checked={contractType.includes("EMPLOYMENT_CONTRACT")} 
            onChange={(e) => {setContractType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        EMPLOYMENT_CONTRACT: ({countJobContactType.find(count => count[0] === "EMPLOYMENT_CONTRACT")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="B2B" checked={contractType.includes("B2B")} 
            onChange={(e) => {setContractType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        B2B: ({countJobContactType.find(count => count[0] === "B2B")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="MANDATE_CONTRACT" checked={contractType.includes("MANDATE_CONTRACT")} 
            onChange={(e) => {setContractType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        MANDATE_CONTRACT: ({countJobContactType.find(count => count[0] === "MANDATE_CONTRACT")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="SPECIFIC_WORK_CONTRACT" checked={contractType.includes("SPECIFIC_WORK_CONTRACT")} 
            onChange={(e) => {setContractType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        SPECIFIC_WORK_CONTRACT: ({countJobContactType.find(count => count[0] === "SPECIFIC_WORK_CONTRACT")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="INTERNSHIP" checked={contractType.includes("INTERNSHIP")} 
            onChange={(e) => {setContractType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        INTERNSHIP: ({countJobContactType.find(count => count[0] === "INTERNSHIP")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="APPRENTICESHIP" checked={contractType.includes("APPRENTICESHIP")} 
            onChange={(e) => {setContractType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        APPRENTICESHIP: ({countJobContactType.find(count => count[0] === "APPRENTICESHIP")?.[1] ?? 0})</label> 
</div>

         <label>Salary Period</label> 
<div> 
    <label> 
        <input type="checkbox" value="HOUR" checked={salaryPeriod.includes("HOUR")} 
            onChange={(e) => {setSalaryPeriod(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(period => period !== e.target.value));setPage(0);}}/> 
        HOUR: ({countJobSalaryPeriod.find(count => count[0] === "HOUR")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="DAY" checked={salaryPeriod.includes("DAY")} 
            onChange={(e) => {setSalaryPeriod(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(period => period !== e.target.value));setPage(0);}}/> 
        DAY: ({countJobSalaryPeriod.find(count => count[0] === "DAY")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="WEEK" checked={salaryPeriod.includes("WEEK")} 
            onChange={(e) => {setSalaryPeriod(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(period => period !== e.target.value));setPage(0);}}/> 
        WEEK: ({countJobSalaryPeriod.find(count => count[0] === "WEEK")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="MONTH" checked={salaryPeriod.includes("MONTH")} 
            onChange={(e) => {setSalaryPeriod(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(period => period !== e.target.value));setPage(0);}}/> 
        MONTH: ({countJobSalaryPeriod.find(count => count[0] === "MONTH")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="YEAR" checked={salaryPeriod.includes("YEAR")} 
            onChange={(e) => {setSalaryPeriod(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(period => period !== e.target.value));setPage(0);}}/> 
        YEAR: ({countJobSalaryPeriod.find(count => count[0] === "YEAR")?.[1] ?? 0})</label> 
</div>

          <label>Employment Type</label> 
<div> 
    <label> 
        <input type="checkbox" value="FULL_TIME" checked={employmentType.includes("FULL_TIME")} 
            onChange={(e) => {setEmploymentType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        FULL_TIME: ({countJobEmploymentType.find(count => count[0] === "FULL_TIME")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="PART_TIME" checked={employmentType.includes("PART_TIME")} 
            onChange={(e) => {setEmploymentType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        PART_TIME: ({countJobEmploymentType.find(count => count[0] === "PART_TIME")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="CONTRACT" checked={employmentType.includes("CONTRACT")} 
            onChange={(e) => {setEmploymentType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        CONTRACT: ({countJobEmploymentType.find(count => count[0] === "CONTRACT")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="TEMPORARY" checked={employmentType.includes("TEMPORARY")} 
            onChange={(e) => {setEmploymentType(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(type => type !== e.target.value));setPage(0);}}/> 
        TEMPORARY: ({countJobEmploymentType.find(count => count[0] === "TEMPORARY")?.[1] ?? 0})</label> 
</div>

        <label>Job Category</label> 
<div> 
    <label> 
        <input type="checkbox" value="IT" checked={jobCategory.includes("IT")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}
            /> 
        IT: ({jobCategoryCounts.find(count => count[0] === "IT")?.[1] ?? 0})</label> 
</div> 

<div> 
    <label> 
        <input type="checkbox" value="PHYSICAL_WORK" checked={jobCategory.includes("PHYSICAL_WORK")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        PHYSICAL_WORK: ({jobCategoryCounts.find(count => count[0] === "PHYSICAL_WORK")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="OFFICE_WORK" checked={jobCategory.includes("OFFICE_WORK")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        OFFICE_WORK: ({jobCategoryCounts.find(count => count[0] === "OFFICE_WORK")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="SALES" checked={jobCategory.includes("SALES")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        SALES: ({jobCategoryCounts.find(count => count[0] === "SALES")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="CUSTOMER_SERVICE" checked={jobCategory.includes("CUSTOMER_SERVICE")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        CUSTOMER_SERVICE: ({jobCategoryCounts.find(count => count[0] === "CUSTOMER_SERVICE")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="FINANCE" checked={jobCategory.includes("FINANCE")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        FINANCE: ({jobCategoryCounts.find(count => count[0] === "FINANCE")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="ACCOUNTING" checked={jobCategory.includes("ACCOUNTING")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        ACCOUNTING: ({jobCategoryCounts.find(count => count[0] === "ACCOUNTING")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="HR" checked={jobCategory.includes("HR")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        HR: ({jobCategoryCounts.find(count => count[0] === "HR")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="MARKETING" checked={jobCategory.includes("MARKETING")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        MARKETING: ({jobCategoryCounts.find(count => count[0] === "MARKETING")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="LOGISTICS" checked={jobCategory.includes("LOGISTICS")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        LOGISTICS: ({jobCategoryCounts.find(count => count[0] === "LOGISTICS")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="TRANSPORT" checked={jobCategory.includes("TRANSPORT")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        TRANSPORT: ({jobCategoryCounts.find(count => count[0] === "TRANSPORT")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="PRODUCTION" checked={jobCategory.includes("PRODUCTION")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        PRODUCTION: ({jobCategoryCounts.find(count => count[0] === "PRODUCTION")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="CONSTRUCTION" checked={jobCategory.includes("CONSTRUCTION")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        CONSTRUCTION: ({jobCategoryCounts.find(count => count[0] === "CONSTRUCTION")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="HEALTHCARE" checked={jobCategory.includes("HEALTHCARE")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        HEALTHCARE: ({jobCategoryCounts.find(count => count[0] === "HEALTHCARE")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="EDUCATION" checked={jobCategory.includes("EDUCATION")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        EDUCATION: ({jobCategoryCounts.find(count => count[0] === "EDUCATION")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="GASTRONOMY" checked={jobCategory.includes("GASTRONOMY")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        GASTRONOMY: ({jobCategoryCounts.find(count => count[0] === "GASTRONOMY")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="ENGINEERING" checked={jobCategory.includes("ENGINEERING")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        ENGINEERING: ({jobCategoryCounts.find(count => count[0] === "ENGINEERING")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="SECURITY" checked={jobCategory.includes("SECURITY")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        SECURITY: ({jobCategoryCounts.find(count => count[0] === "SECURITY")?.[1] ?? 0})</label> 
</div> 
<div> 
    <label> 
        <input type="checkbox" value="BEAUTY" checked={jobCategory.includes("BEAUTY")} 
            onChange={(e) => {setJobCategory(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(category => category !== e.target.value));setPage(0);}}/> 
        BEAUTY: ({jobCategoryCounts.find(count => count[0] === "BEAUTY")?.[1] ?? 0})</label> 
</div>


         </div>
    );
}

export default Filters;